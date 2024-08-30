import { Cascade, Collection, Entity,ManyToMany,PrimaryKey,Property } from "@mikro-orm/core";
import { List } from "../list/list.entity.js";
@Entity()
export class ShowContent {
    @PrimaryKey({autoincrement:false})
    idContent!:number

    @Property({nullable:false})
    nameContent!:string

    @ManyToMany(()=>List,list=>list.contents,{cascade:[Cascade.ALL]})
    lists = new Collection<List>(this);
}