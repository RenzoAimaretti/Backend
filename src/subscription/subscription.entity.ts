import { Cascade,Entity,OneToMany,Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { User } from "../user/user.entity.js";

@Entity()
export class Subscription extends BaseEntity{
        
    @Property({nullable:false})
    name!:string

    @Property({nullable:false})
    cantidadSem!:number
    
    @OneToMany(()=>User, user=>user.subscription, {cascade:[Cascade.ALL]})
    users!:User[]
}
