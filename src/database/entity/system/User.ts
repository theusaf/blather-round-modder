import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ProjectEntity } from "./Project.js";
import { BaseEntityWrapper } from "../base_wrapper.js";

@Entity({ name: "user" })
export class UserEntity extends BaseEntityWrapper {
  @PrimaryColumn()
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => ProjectEntity, (project) => project.owner, {
    cascade: true,
  })
  projects: Promise<ProjectEntity[]>;
}
