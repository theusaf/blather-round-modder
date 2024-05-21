import { Model } from ".";

export default class User extends Model {
  username: string;
  password: string;

  constructor(data: Partial<User>) {
    super();
    this.username = data.username ?? "";
    this.password = data.password ?? "";
  }

  async save(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
