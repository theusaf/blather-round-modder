import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  env = process.env.NODE_ENV || "development",
  sessionDatabaseLocations: Record<string, string> = {
    development: join(__dirname, "../../../data/session-dev.sqlite"),
    production: join(__dirname, "/data/session.sqlite"),
    test: join(__dirname, "/data/session-test.sqlite"),
  },
  sessionMigrationFolder = join(__dirname, "../session/migrations"),
  sessionEntityFolder = join(__dirname, "../session/entity");

const dataSource = new DataSource({
  type: "sqlite",
  database: sessionDatabaseLocations[env],
  synchronize: false,
  logging: true,
  entities: [join(sessionEntityFolder, "**/*.ts"), join(sessionEntityFolder, "**/*.js")],
  migrations: [
    join(sessionMigrationFolder, "**/*.ts"),
    join(sessionMigrationFolder, "**/*.js"),
  ],
  subscribers: [],
});

export const SessionDataSource = dataSource;
