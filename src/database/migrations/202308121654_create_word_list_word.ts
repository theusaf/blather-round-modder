export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "word_list_word" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "word" VARCHAR(255) NOT NULL,
      "always_choose" BOOLEAN NOT NULL,
      "word_list_id" INTEGER NOT NULL,
      FOREIGN KEY ("word_list_id")
        REFERENCES "word_list" ("id")
        ON DELETE CASCADE,
      UNIQUE ("word", "word_list_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "word_list_word"
    `,
  ];
}
