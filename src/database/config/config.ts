import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  databaseLocations: Record<string, string> = {
    development: join(__dirname, "../../../data/database-dev.sqlite"),
    production: join(__dirname, "/data/database.sqlite"),
    test: join(__dirname, "/data/database-test.sqlite"),
  },
  env = process.env.NODE_ENV || "development",
  migrationFolder = join(__dirname, "../migrations"),
  entityFolder = join(__dirname, "../entity");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: databaseLocations[env],
  synchronize: false,
  logging: true,
  entities: [join(entityFolder, "**/*.ts")],
  migrations: [join(migrationFolder, "**/*.ts")],
  subscribers: [],
});
