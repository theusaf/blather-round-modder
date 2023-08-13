import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Dialect } from "sequelize";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Config {
  storage: string;
  dialect: Dialect;
}

const config: Record<string, Config> = {
  development: {
    storage: join(__dirname, "../../../data/database-dev.sqlite"),
    dialect: "sqlite",
  },
  test: {
    storage: join(__dirname, "../../../data/database-test.sqlite"),
    dialect: "sqlite",
  },
  production: {
    storage: "/data/database-prod.sqlite",
    dialect: "sqlite",
  },
};

export default config;
