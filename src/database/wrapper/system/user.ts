import { BaseWrapper } from "../base.js";
import { Project } from "./project.js";

export class User extends BaseWrapper {}

User.tableName = "user";
User.attributeNames = ["username", "password", "projects"];

User.hasMany({
  attribute: "projects",
  foreignKey: "user_id",
  cls: Project,
  mapper(model: Project) {
    return model.toJSON();
  }
});
