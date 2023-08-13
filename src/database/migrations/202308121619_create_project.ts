export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "project" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name" VARCHAR(255) NOT NULL,
      "description" TEXT,
      "user_id" INTEGER NOT NULL,
      FOREIGN KEY ("user_id")
        REFERENCES "user" ("username")
        ON DELETE CASCADE,
      UNIQUE ("name", "user_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "project"
    `,
  ];
}
