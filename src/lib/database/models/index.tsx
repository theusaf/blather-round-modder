import "server-only";
import type { QueryOptions, QueryWhereOptions } from "@/lib/types/database";
import type { Query } from "firebase-admin/firestore";

export abstract class Model {
	abstract save(): Promise<this>;
	abstract delete(): Promise<void>;
	abstract toJSON(): unknown;
}

/**
 * Executes a Firestore query with the given options.
 *
 * @param baseQuery The base query/collection to start with.
 * @param queryOptions The options to apply to the query.
 * @returns The data from the query.
 */
export async function executeQuery<T, TIface extends T = T>(
	baseQuery: Query,
	queryOptions?: QueryOptions<TIface>,
): Promise<T[]> {
	let query = baseQuery;
	// query = query.orderBy("id");
	if (queryOptions?.where) {
		query = recursiveWhere(query, queryOptions.where);
	}
	if (queryOptions?.limit) {
		query = query.limit(queryOptions.limit);
	}
	if (queryOptions?.cursor) {
		query = query.offset(queryOptions.cursor);
	}
	const snapshot = await query.get();
	const data: T[] = [];
	// biome-ignore lint/complexity/noForEach: This is a Firestore API, not a regular array
	snapshot.forEach((doc) => {
		data.push(doc.data() as T);
	});
	return data;
}

export function recursiveWhere<T>(
	initialQuery: FirebaseFirestore.Query,
	where: QueryWhereOptions<T>,
): FirebaseFirestore.Query {
	let query = initialQuery;
	if (where.$and) {
		for (const subWhere of where.$and) {
			query = recursiveWhere(query, subWhere);
		}
	}
	if (where.$or) {
		throw new Error("Not implemented");
	}
	if (where.$not) {
		throw new Error("Not implemented");
	}
	if (where.$ge) {
		for (const key in where.$ge) {
			query = query.where(key, ">=", where.$ge[key]);
		}
	}
	if (where.$gt) {
		for (const key in where.$gt) {
			query = query.where(key, ">", where.$gt[key]);
		}
	}
	if (where.$le) {
		for (const key in where.$le) {
			query = query.where(key, "<=", where.$le[key]);
		}
	}
	if (where.$lt) {
		for (const key in where.$lt) {
			query = query.where(key, "<", where.$lt[key]);
		}
	}
	if (where.$in) {
		for (const key in where.$in) {
			query = query.where(key, "in", where.$in[key]);
		}
	}
	for (const key in where) {
		if (key[0] !== "$") {
			query = query.where(key, "==", where[key as keyof T]);
		}
	}
	return query;
}
