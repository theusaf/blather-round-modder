import {
  Column,
  Entity,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "user_session" })
export class UserSessionEntity extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  session_id: string;

  @Column()
  user_id: string;
}
