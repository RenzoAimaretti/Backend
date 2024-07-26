import { Cascade,Collection, Entity,ManyToOne,ManyToMany,OneToMany,Property, Rel } from "@mikro-orm/core";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { List } from "../list/list.entity.js";
import { Subscription } from "../subscription/subscription.entity.js";
import { Comment } from "../showContent/comment.entity.js";
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

        @OneToMany(()=>List, (list)=>list.owner, {cascade:[Cascade.ALL]})
        lists=new Collection<List>(this)

        @ManyToMany(() => User, user => user.friendsFrom, { cascade: [Cascade.ALL], owner: true })
        friends = new Collection<User>(this)

        @ManyToMany(() => User, user => user.friends, { cascade: [Cascade.ALL]})
        friendsFrom = new Collection<User>(this)

        //habria q dejar el owner de este lado o del lado de listas??
        @ManyToMany(()=>List,list=>list.followers,{cascade:[Cascade.ALL],owner:true})
        followingLists!:List[]

        @ManyToOne(()=>Subscription,{nullable:false})
        subscription!:Rel<Subscription>

        
}