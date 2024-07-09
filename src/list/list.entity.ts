import { Collection, Entity,ManyToMany,ManyToOne,Property,Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { User } from "../user/user.entity.js";


@Entity()
export class List extends BaseEntity{
            
    @Property({nullable:false})
    nameList!:string

    @Property({nullable:false})
    descriptionList!:string

    /*Contents no esta definido todavia :) */

    @ManyToOne(()=> User,{nullable:false})
    owner!: Rel<User>

    /*
    @Property({nullable:true})
    duration: ??? 
    no se que tipo de dato es y todavia hay q pensar la implementacion
    */

    @ManyToMany(()=>User,user=>user.followingLists)
    followers = new Collection<User>(this)
}
    

