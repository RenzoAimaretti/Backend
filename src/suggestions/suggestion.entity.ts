import { Entity, ManyToOne, Property, t } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Admin } from "../admin/admin.entity.js";

@Entity()
export class Suggestion extends BaseEntity {
  @Property({ nullable: false })
  titleSuggestion!: string;

  @Property({ nullable: false })
  description!: string;

  //un admin puede revisar muchas sugerencias y aprobarlas o rechazarlas
  @ManyToOne(() => Admin, { nullable: true })
  admin!: Admin;

  @Property({ nullable: true })
  comentarioAdmin!: string;

  @Property({ nullable: false })
  estado!: string;
}
