import { UserModel } from "@/database/models/system/user.js";
import { BaseWrapper } from "../base.js";
import { Project } from "./project.js";

export class User extends BaseWrapper<UserModel> {

  get username(): string {
    return this.model.username;
  }
  set username(value: string) {
    this.model.username = value;
  }

  get password(): string {
    return this.model.password;
  }
  set password(value: string) {
    throw new Error("Cannot set password directly, use `setPassword()` instead");
  }

  get projects(): Project[] {
    return this.model.projects.map((project) => new Project(project));
  }
  set projects(_: Project[]) {
    throw new Error("Cannot set projects directly, use `setProjects()` instead");
  }

}
