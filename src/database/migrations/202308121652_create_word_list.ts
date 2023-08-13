export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "word_list" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "amount" INTEGER,
      "max_choices" INTEGER,
      "name" VARCHAR(255) NOT NULL,
      "optional" BOOLEAN NOT NULL,
      "placeholder" VARCHAR(255),
      "project_id" INTEGER NOT NULL,
      FOREIGN KEY ("project_id")
        REFERENCES "project" ("id")
        ON DELETE CASCADE,
      UNIQUE ("name", "project_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "word_list"
    `,
  ];
}
