import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { ProjectEntity } from "./Project.js";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  username: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects: ProjectEntity[];
}
