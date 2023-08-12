import { Sequelize } from "sequelize-typescript";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import models from "./models";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage:
    process.env["DB_PATH"] ||
    join(__dirname, "../../../data/database-dev.sqlite"),
});

sequelize.addModels(models);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
