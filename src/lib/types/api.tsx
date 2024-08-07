export interface ProjectListingAPIOptions {
	limit?: number;
	cursor?: number;

	// NOTE: Since Firestore doesn't support full-text search, we'll need to implement this ourselves,
	// use a third-party service, not implement search, or switch to a different database.
	query?: string;
	userId?: string;
}
