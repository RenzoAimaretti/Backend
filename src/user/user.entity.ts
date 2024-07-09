import { Cascade,Collection, Entity,ManyToOne,ManyToMany,OneToMany,Property, Rel } from "@mikro-orm/core";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { List } from "../list/list.entity.js";
@Entity()
export class User extends BaseEntity{
        
        @Property({nullable:false})
        name!:string
    
        @Property({nullable:false})
        email!:string
    
        @Property({nullable:false})
        password!:string

        @ManyToOne(()=>RangoCinefilo,{nullable:false})
        rangoCinefilo!: Rel<RangoCinefilo>

        @OneToMany(()=>List, list=>list.owner, {cascade:[Cascade.ALL]})
        lists=new Collection<List>(this)


        //habria q dejar el owner de este lado o del lado de listas??
        @ManyToMany(()=>List,list=>list.followers,{cascade:[Cascade.ALL],owner:true})
        followingLists!:List[]
}