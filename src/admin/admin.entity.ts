import { Entity } from "@mikro-orm/core";
import { Account } from "../account/account.entity.js";

@Entity()
export class Admin extends Account {
  adminName!: string;
  adminStatus!: boolean;
}
