export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "password_spellings" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "spelling" VARCHAR(255) NOT NULL,
      "password_id" INTEGER NOT NULL,
      FOREIGN KEY ("password_id")
        REFERENCES "password" ("id")
        ON DELETE CASCADE,
      UNIQUE ("spelling", "password_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "password_spellings"
    `,
  ];
}
