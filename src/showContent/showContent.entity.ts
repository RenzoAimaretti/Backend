import { Cascade, Collection, Entity,ManyToMany,PrimaryKey,Property } from "@mikro-orm/core";
import { List } from "../list/list.entity.js";
@Entity()
export class ShowContent {
    @PrimaryKey({autoincrement: false})
    idContent!: number;

    @Property({nullable: false})
    nameContent!: string;

    // Relación many-to-many con List, mapeada (no dueña)
    @ManyToMany(() => List, list => list.contents)
    lists = new Collection<List>(this);
}