export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "password" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "category" VARCHAR(32) NOT NULL,
      "difficulty" VARCHAR(32) NOT NULL,
      "password" VARCHAR(255) NOT NULL,
      "subcategory" VARCHAR(255) NOT NULL,
      "us" BOOLEAN NOT NULL,
      "project_id" INTEGER NOT NULL,
      FOREIGN KEY ("project_id")
        REFERENCES "project" ("id")
        ON DELETE CASCADE,
      UNIQUE ("password", "project_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "password"
    `,
  ];
}
