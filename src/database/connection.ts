import { Sequelize } from "sequelize-typescript";
import models from "./models/models.js";
import config from "./config/config.js";

const sequelize = new Sequelize(config[process.env.NODE_ENV?.toLowerCase() || "development"]);

sequelize.addModels(models);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
