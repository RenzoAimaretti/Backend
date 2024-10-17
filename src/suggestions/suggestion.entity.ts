import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Suggestion extends BaseEntity {
  @Property({ nullable: false })
  titleSuggestion!: string;

  @Property({ nullable: false })
  description!: string;
}
