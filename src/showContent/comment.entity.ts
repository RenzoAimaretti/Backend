import { Collection, Entity,ManyToMany,ManyToOne,PrimaryKey,PrimaryKeyType,Property,Rel } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { Review } from "./review.entity.js";

@Entity()
export class Comment{
    @ManyToOne(()=>User,{nullable:false, primary:true})
    commentOwner!: Rel<User>;

    @ManyToOne(()=>Review,{nullable:false, primary:true})
    commentReview!: Rel<Review>;

    @Property({nullable:false})
    comment!:string;

}