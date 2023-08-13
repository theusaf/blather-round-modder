export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "password_forbidden_word" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "word" VARCHAR(255) NOT NULL,
      "password_id" INTEGER NOT NULL,
      FOREIGN KEY ("password_id")
        REFERENCES "password" ("id")
        ON DELETE CASCADE,
      UNIQUE ("word", "password_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "password_forbidden_word"
    `,
  ];
}
