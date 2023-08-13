import db from "../connection";
import { select } from "sql-bricks";

export interface WrapperRelationship {
  attribute: string;
  mapper: (input: any) => any;
  cls: typeof BaseWrapper;
  type: "hasOne" | "hasMany" | "belongsTo";
  foreignKey: string;
}

export interface WrapperQueryOptions {
  where?: Record<string, any>;
  limit?: number;
  offset?: number;
  order?: string;
}

export class BaseWrapper<T extends Record<string, any>> {
  private changedAttributes: Set<string> = new Set();

  protected data: T = {} as T;

  static attributeNames: string[];
  static tableName: string;
  static relationships: Record<string, WrapperRelationship> = {};

  id: number | null = null;

  /**
   * @param tableName     The internal name of the table for this model
   * @param attributes    The names of the attributes of this model
   */
  constructor(data: Record<string, any>) {
    this.data = data as T;
    this.id = data.id ?? null;
    if (this.id !== null) {
      for (const key of this.getConstructor().attributeNames) {
        this.changedAttributes.add(key);
      }
    }
  }

  protected static hasMany<M extends BaseWrapper<any>, R>({
    attribute,
    mapper,
    cls,
    foreignKey,
  }: WrapperRelationship): void {
    this.relationships[attribute] = {
      attribute,
      mapper,
      cls,
      type: "hasMany",
      foreignKey,
    };
  }

  protected static hasOne<M extends BaseWrapper<any>, R>({
    attribute,
    mapper,
    cls,
    foreignKey,
  }: WrapperRelationship): void {
    this.relationships[attribute] = {
      attribute,
      mapper,
      cls,
      type: "hasOne",
      foreignKey,
    };
  }

  protected static belongsTo<M extends BaseWrapper<any>, R>({
    attribute,
    mapper,
    cls,
    foreignKey,
  }: WrapperRelationship): void {
    this.relationships[attribute] = {
      attribute,
      mapper,
      cls,
      type: "belongsTo",
      foreignKey,
    };
  }

  async save(): Promise<boolean> {
    return false;
  }

  async create(): Promise<boolean> {
    return false;
  }

  async update(): Promise<boolean> {
    return false;
  }

  async delete(): Promise<boolean> {
    return false;
  }

  async reload(): Promise<boolean> {
    for (const key of this.getConstructor().attributeNames) {
      this.changedAttributes.add(key);
    }
    await this.getMany(this.getConstructor().attributeNames);
    return false;
  }

  set(attribute: string, value: any): void {
    this.data[attribute as keyof T] = value;
    this.changedAttributes.add(attribute);
  }

  async get<D = unknown>(attribute: string): Promise<D> {
    if (!this.changedAttributes.has(attribute)) return this.data[attribute];
    const relationships = this.getConstructor().relationships;
    let data;
    if (relationships[attribute]) {
      const { type, cls, mapper } = relationships[attribute];
      switch (type) {
        case "hasOne": {
          const obj = await cls.find({
            where: {
              [relationships[attribute].foreignKey]: this.id,
            },
          });
          data = mapper(obj);
          break;
        }
        case "hasMany": {
          const objs = await cls.findAll({
            where: {
              [relationships[attribute].foreignKey]: this.id,
            },
          });
          data = objs.map(mapper);
          break;
        }
        case "belongsTo": {
          const obj = await cls.find({
            where: {
              id: this.get(relationships[attribute].foreignKey),
            },
          });
          data = mapper(obj);
          break;
        }
      }
    } else {
      const { text: query, values: params } = select(attribute)
        .from(this.getConstructor().tableName)
        .where({ id: this.id })
        .toParams();
      const result = db
        .prepare(query)
        .pluck()
        .get(...params);
      data = result;
    }
    this.data[attribute as keyof T] = data;
    this.changedAttributes.delete(attribute);
    return data;
  }

  async getMany(attributes: string[]): Promise<unknown> {
    const constructor = this.getConstructor(),
      relationships = constructor.relationships,
      nonRelationshipAttributes = attributes.filter(
        (attribute) => !relationships[attribute],
      ),
      relationshipAttributes = attributes.filter(
        (attribute) => relationships[attribute],
      ),
      query = select(nonRelationshipAttributes)
        .from(constructor.tableName)
        .where({ id: this.id })
        .toParams(),
      results = {};
    if (nonRelationshipAttributes.length) {
      const result = db.prepare(query.text).get(...query.values);
      Object.assign(results, result);
    }
    if (relationshipAttributes.length) {
      for (const attribute of relationshipAttributes) {
        const value = await this.get(attribute);
        Object.assign(results, { [attribute]: value });
      }
    }
    Object.assign(this.data, results);
    for (const attribute of attributes) {
      this.changedAttributes.delete(attribute);
    }
    return results;
  }

  getConstructor(): typeof BaseWrapper {
    return this.constructor as typeof BaseWrapper;
  }

  static async create(data: Record<string, any>): Promise<BaseWrapper<any>> {
    const instance = new this(data);
    await instance.save();
    return instance;
  }

  static async findAll<E extends BaseWrapper<any>>(
    options: WrapperQueryOptions,
  ): Promise<E[]> {
    const initialQuery = select("*").from(this.tableName);
    if (options.where) initialQuery.where(options.where);
    if (options.order) initialQuery.orderBy(options.order);
    let query = initialQuery.toParams();
    if (options.limit) {
      query.text += " LIMIT ?";
      query.values.push(options.limit);
    }
    if (options.offset) {
      query.text += " OFFSET ?";
      query.values.push(options.offset);
    }
    return db
      .prepare(query.text)
      .all(...query.values)
      .map((row) => new this(row as Record<string, any>) as E);
  }

  static async find<E extends BaseWrapper<any>>(
    options: WrapperQueryOptions,
  ): Promise<E> {
    const initialQuery = select("*").from(this.tableName);
    if (options.where) initialQuery.where(options.where);
    if (options.order) initialQuery.orderBy(options.order);
    let query = initialQuery.toParams();
    if (options.limit) {
      query.text += " LIMIT ?";
      query.values.push(options.limit);
    }
    if (options.offset) {
      query.text += " OFFSET ?";
      query.values.push(options.offset);
    }
    return new this(
      db.prepare(query.text).get(...query.values) as Record<string, any>,
    ) as E;
  }

  /**
   * Calls all validation methods and returns true if all of them return true.
   *
   * Validation methods must be named in the following format: validate[Name]
   */
  async isValid(): Promise<boolean> {
    const validations = Object.keys(this).filter((key) =>
      /^validate\b/.test(key),
    );
    for (const validation of validations) {
      if (!(await (this[validation as keyof this] as CallableFunction)())) {
        return false;
      }
    }
    return true;
  }

  async toJSON(): Promise<T> {
    const json: Record<string, any> = {};
    for (const attribute of this.getConstructor().attributeNames) {
      json[attribute] = await this.get(attribute);
    }
    return json as T;
  }
}
