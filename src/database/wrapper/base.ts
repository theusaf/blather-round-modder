import { Model } from "sequelize-typescript";

export class BaseWrapper<T extends Model = Model, ID = number> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }

  get id(): ID {
    return this.model.id;
  }
  set id(id: ID) {
    this.model.id = id;
  }

  async save(): Promise<void> {
    await this.model.save();
  }
}
