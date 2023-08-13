export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "sentence_structure_string" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "string" TEXT NOT NULL,
      "sentence_structure_id" INTEGER NOT NULL,
      FOREIGN KEY ("sentence_structure_id")
        REFERENCES "sentence_structure" ("id")
        ON DELETE CASCADE,
      UNIQUE ("string", "sentence_structure_id")
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "sentence_structure_string"
    `,
  ];
}
