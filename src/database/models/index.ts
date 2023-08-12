import models from "./models";
import { Model, Sequelize } from "sequelize-typescript";
import sequelize from "../connection";

interface DB {
  [key: string]: Model | unknown;
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
}

const db: DB = {};

for (const model of models) {
  db[model.name] = model;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
