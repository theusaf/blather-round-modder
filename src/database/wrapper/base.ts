import db from "../connection.js";
import { deleteFrom, insert, select, update } from "sql-bricks";

export class InvalidValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidValueError";
  }
}

export interface WrapperRelationship {
  /**
   * The name of the attribute that this relationship is for.
   */
  attribute: string;
  /**
   * A function that maps an input (Wrapper) to an output for JSON purposes.
   *
   * Warning: Ensure that this function does not cause an infinite loop.
   */
  mapper: (input: any) => any;
  /**
   * The class that this relationship is for.
   */
  cls: typeof BaseWrapper<any>;
  type?: "hasOne" | "hasMany" | "belongsTo";
  /**
   * The name of the foreign key for this relationship.
   *
   * If this is a `belongs...` relationship, this is the name of the foreign key on the current model for the other model.
   *
   * If this is a `has...` relationship, this is the name of the foreign key on the other model for this model.
   */
  foreignKey: string;
}

export interface WrapperQueryOptions {
  where?: Record<string, any>;
  limit?: number;
  offset?: number;
  order?: string;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function doTransaction(callback: () => void): void {
  db.transaction(callback);
}

export class BaseWrapper<T extends Record<string, any> = Record<string, any>> {
  private changedAttributes: Set<string> = new Set();

  protected data: Record<string, BaseWrapper | any> = {};

  static attributeNames: string[];
  static tableName: string;
  static relationships: Record<string, WrapperRelationship> = {};
  static primaryKey: string = "id";

  id: number | null = null;

  /**
   * @param tableName     The internal name of the table for this model
   * @param attributes    The names of the attributes of this model
   */
  constructor(data: Record<string, any>) {
    const constructor = this.getConstructor();
    this.data = data as T;
    this.id = data[constructor.primaryKey] ?? null;
    if (this.id !== null) {
      for (const key of this.getConstructor().attributeNames) {
        this.changedAttributes.add(key);
      }
    }
  }

  static hasMany({
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

  static hasOne({
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

  static belongsTo({
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

  async save(): Promise<void> {
    if (this.id !== null) {
      await this.update();
    } else {
      await this.create();
    }
  }

  async create(): Promise<void> {
    const constructor = this.getConstructor(),
      relationships = constructor.relationships,
      query = insert(constructor.tableName),
      insertedAttributes: Record<string, any>[] = [];
    for (const attr of constructor.attributeNames) {
      if (hasOwnProperty.call(relationships, attr)) {
        this.data[attr].save();
      } else {
        insertedAttributes.push({ [attr]: this.data[attr] });
      }
    }
    query.values(insertedAttributes);
    const { text, values } = query.toParams(),
      result = db.prepare(text).run(...values);
    this.id = Number(result.lastInsertRowid);
    this.changedAttributes.clear();
  }

  async update(): Promise<void> {
    const constructor = this.getConstructor(),
      relationships = constructor.relationships,
      query = update(constructor.tableName),
      insertedAttributes: Record<string, any>[] = [];
    for (const attr of constructor.attributeNames) {
      if (hasOwnProperty.call(relationships, attr)) {
        this.data[attr].save();
      } else if (this.changedAttributes.has(attr)) {
        insertedAttributes.push({ [attr]: this.data[attr] });
      }
    }
    query.values(insertedAttributes);
    const { text, values } = query.toParams();
    db.prepare(text).run(...values);
    this.changedAttributes.clear();
  }

  async delete(): Promise<void> {
    const constructor = this.getConstructor();
    const query = deleteFrom(constructor.tableName)
      .where({ id: this.id })
      .toParams();
    db.prepare(query.text).run(...query.values);
    this.id = null;
    this.changedAttributes.clear();
  }

  async reload(): Promise<void> {
    for (const key of this.getConstructor().attributeNames) {
      this.changedAttributes.add(key);
    }
    await this.getMany(this.getConstructor().attributeNames);
  }

  set(attribute: string, value: any): void {
    const relationship = this.getConstructor().relationships[attribute];
    if (relationship) {
      if (value instanceof relationship.cls) {
        this.data[attribute] = value;
        this.data[relationship.foreignKey] = value.get(
          relationship.cls.primaryKey,
        );
      } else {
        throw new InvalidValueError(
          `Invalid value for ${attribute}: ${value} is not an instance of ${relationship.cls.name}`,
        );
      }
    } else {
      this.data[attribute] = value;
    }
    this.changedAttributes.add(attribute);
  }

  async get<D = unknown>(attribute: string): Promise<D> {
    if (!this.changedAttributes.has(attribute)) return this.data[attribute];
    const relationships = this.getConstructor().relationships;
    let data: any;
    if (relationships[attribute]) {
      const { type, cls, foreignKey } = relationships[attribute];
      switch (type) {
        case "hasOne": {
          const obj = await cls.find({
            where: {
              [foreignKey]: this.id,
            },
          });
          data = obj;
          break;
        }
        case "hasMany": {
          const objs = await cls.findAll({
            where: {
              [foreignKey]: this.id,
            },
          });
          data = objs;
          break;
        }
        case "belongsTo": {
          const obj = await cls.find({
            where: {
              [cls.primaryKey]: this.get(foreignKey),
            },
          });
          data = obj;
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
    this.data[attribute] = data;
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
    return (
      await this.findAll<E>({
        ...options,
        limit: 1,
      })
    )[0];
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

  async toJSONAttribute<A = any>(attribute: string): Promise<A> {
    const relationship = this.getConstructor().relationships[attribute];
    if (relationship) {
      return relationship.mapper(await this.get(attribute));
    } else {
      return this.get(attribute);
    }
  }

  async toJSON(): Promise<T> {
    const json: Record<string, any> = {};
    for (const attribute of this.getConstructor().attributeNames) {
      json[attribute] = await this.toJSONAttribute(attribute);
    }
    return json as T;
  }
}
