export type QueryWhereOptions<T> = {
  $and?: Array<QueryWhereOptions<T>>;
  $or?: Array<QueryWhereOptions<T>>;
  $not?: QueryWhereOptions<T>;
  $ge?: Partial<T>;
  $gt?: Partial<T>;
  $le?: Partial<T>;
  $lt?: Partial<T>;
  $in?: Array<Partial<Record<keyof T, T[keyof T][]>>>;
} & Partial<T>;

export interface QueryOptions<T> {
  cursor?: number;
  limit?: number;
  orderBy?: keyof T;
  where?: QueryWhereOptions<T>;
}
