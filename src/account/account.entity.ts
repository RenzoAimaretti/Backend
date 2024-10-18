import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ abstract: true })
export class Account {
  @PrimaryKey({ autoincrement: true })
  id!: number;
  @Property({ nullable: false })
  name!: string;
  @Property({ nullable: false })
  email!: string;
  @Property({ nullable: false })
  password!: string;
}
