export function up(): string[] {
  return [
    `
    CREATE TABLE IF NOT EXISTS "user" (
      "username" VARCHAR(64) PRIMARY KEY,
      "password" VARCHAR(64) NOT NULL
    )
    `,
  ];
}

export function down(): string[] {
  return [
    `
    DROP TABLE IF EXISTS "user"
    `,
  ];
}
