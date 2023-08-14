import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { ProjectEntity } from "./Project.js";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  emailVerified: boolean;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects: ProjectEntity[];
}
