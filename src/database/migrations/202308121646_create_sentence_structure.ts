export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "sentence_structure" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "category" VARCHAR(32) NOT NULL,
      "project_id" INTEGER NOT NULL,
      FOREIGN KEY ("project_id")
        REFERENCES "project" ("id")
        ON DELETE CASCADE
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "sentence_structure"
    `,
  ];
}
