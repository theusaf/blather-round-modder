export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "password_tailored_word" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "list" VARCHAR(255) NOT NULL,
      "word" VARCHAR(255) NOT NULL,
      "password_id" INTEGER NOT NULL,
      FOREIGN KEY ("password_id")
        REFERENCES "password" ("id")
        ON DELETE CASCADE,
      UNIQUE ("list", "word", "password_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "password_tailored_word"
    `,
  ];
}
