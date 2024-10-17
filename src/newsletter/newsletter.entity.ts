import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Newsletter extends BaseEntity {
  @Property({ nullable: false })
  emailSuscriber!: string;
  @Property({ nullable: false })
  activo!: boolean;
}
