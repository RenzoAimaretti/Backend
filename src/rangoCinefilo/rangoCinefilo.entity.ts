import { User } from "../user/user.entity.js";
import { Cascade, Collection, Entity,OneToMany,Property} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class RangoCinefilo extends BaseEntity{
    
    @Property({nullable:false,unique:true})
    nameRango!:string

    @Property({nullable:false})
    descriptionRango!:string

    @Property({ nullable: true })
    minReviews?: number;

    @OneToMany(() => User, user => user.rangoCinefilo, { cascade: [Cascade.ALL] })
    users = new Collection<User>(this); 
}
