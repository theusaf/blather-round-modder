import { QueryOptions } from "@/lib/types/database";

export abstract class Model {
  abstract save(): Promise<this>;
  abstract delete(): Promise<void>;
}

export async function executeQuery<T, TIface extends T = T>(
  queryOptions: QueryOptions<TIface>,
): Promise<T[]> {
  throw new Error("Method not implemented.");
}
