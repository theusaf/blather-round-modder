import "server-only";
import { Model, executeQuery, recursiveWhere } from ".";
import { QueryOptions } from "@/lib/types/database";
import { firestore } from "../firebase";

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
    await firestore.collection("users").doc(this.username).set({
      username: this.username,
      password: this.password,
    });
    return this;
  }

  async delete(): Promise<void> {
    await firestore.collection("users").doc(this.username).delete();
  }

  static async findById(id: string): Promise<User | null> {
    return (
      (await User.findAll({ where: { username: id }, limit: 1 }))[0] ?? null
    );
  }

  static async findAll(
    options?: QueryOptions<{ username: string; password: string }>,
  ): Promise<User[]> {
    const query = firestore.collection("users");
    return (
      await executeQuery<{ username: string; password: string }>(query, options)
    ).map((data) => new User(data));
  }
}
