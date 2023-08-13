import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: {
  [key: string]: {
    storage: string;
    dialect: "sqlite";
  };
} = {
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
