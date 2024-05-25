import "server-only";
import { Model } from ".";
import { QueryOptions } from "@/lib/types/database";

export default class User extends Model {
  username: string;
  password: string;

  constructor(
    data: Partial<{
      username: string;
      password: string;
    }>,
  ) {
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

  static async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  static async findAll(
    options?: QueryOptions<{ username: string; password: string }>,
  ): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
