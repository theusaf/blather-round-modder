import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import db from "./connection";

const args = process.argv.slice(2),
  __dirname = dirname(fileURLToPath(import.meta.url)),
  migrationsPath = join(__dirname, "migrations");

function getMigrationVersion(): string {
  const version: any = db.prepare("PRAGMA user_version").get();
  return version.user_version;
}

function setMigrationVersion(version: string): void {
  db.prepare(`PRAGMA user_version = ${version}`).run();
}

interface Migration {
  up(): string[];
  down(): string[];
  name: string;
}

async function getMigrations(): Promise<Migration[]> {
  const files = await readdir(migrationsPath);
  return await Promise.all(
    files.map(async (file) => {
      const migration = await import(join(migrationsPath, file));
      return {
        up: migration.up,
        down: migration.down,
        name: file,
      };
    }),
  );
}

function getMigrationVersionFromFileName(fileName: string): string {
  return fileName.split("_")[0];
}

function migrateUp(migration: Migration): void {
  db.transaction(() => {
    migration.up().forEach((query) => {
      db.prepare(query).run();
    });
  })();
}

function migrateDown(migration: Migration): void {
  db.transaction(() => {
    migration.down().forEach((query) => {
      db.prepare(query).run();
    });
  })();
}

async function migrate(): Promise<void> {
  const migrations = await getMigrations(),
    currentVersion = getMigrationVersion(),
    currentVersionIndex = migrations.findIndex(
      (migration) =>
        getMigrationVersionFromFileName(migration.name) === currentVersion,
    ),
    migrationsToRun = migrations.slice(currentVersionIndex + 1);

  migrationsToRun.forEach((migration) => {
    console.log(`Running '${migration.name}'`);
    migrateUp(migration);
    setMigrationVersion(getMigrationVersionFromFileName(migration.name));
  });
}

async function rollback(): Promise<void> {
  const migrations = await getMigrations(),
    currentVersion = getMigrationVersion(),
    currentMigrationIndex = migrations.findIndex(
      (migration) =>
        getMigrationVersionFromFileName(migration.name) === currentVersion,
    ),
    currentMigration = migrations[currentMigrationIndex],
    previousMigration = migrations[currentMigrationIndex - 1];
  console.log(`Current version: ${currentVersion}`);
  if (currentMigrationIndex > 0) {
    console.log(`Rolling back ${currentMigration.name}`);
    migrateDown(currentMigration);
    setMigrationVersion(
      getMigrationVersionFromFileName(previousMigration.name),
    );
  } else {
    console.log("No migrations to rollback");
  }
}

if (args.length === 0) {
  migrate();
} else if (args[0] === "rollback") {
  rollback();
}
