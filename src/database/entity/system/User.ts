import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ProjectEntity } from "./Project";
import { BaseEntityWrapper } from "../base_wrapper";

@Entity({ name: "user" })
export class UserEntity extends BaseEntityWrapper {
  @PrimaryColumn()
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, nullable: true })
  salt: string;

  @Column({ length: 255 })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => ProjectEntity, (project) => project.owner, {
    cascade: true,
  })
  projects: Promise<ProjectEntity[]>;
}
