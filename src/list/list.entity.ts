import {Collection, Entity,ManyToMany,ManyToOne,PrimaryKey,PrimaryKeyType,Property,Rel } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { ShowContent } from "../showContent/showContent.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";


@Entity()
export class List extends BaseEntity{
            
    @Property({nullable:false})
    nameList!:string;

    @Property({nullable:false})
    descriptionList!:string;

    @ManyToMany(()=>ShowContent,showContent=>showContent.lists,{owner:true})
    contents = new Collection<ShowContent>(this);

    @ManyToOne(()=> User,{nullable:false, autoincrement:false})
    owner!: Rel<User>;

    /*
    @Property({nullable:true})
    duration: ??? 
    no se que tipo de dato es y todavia hay q pensar la implementacion
    */

    @ManyToMany(()=>User,user=>user.followingLists)
    followers = new Collection<User>(this);


}
    

