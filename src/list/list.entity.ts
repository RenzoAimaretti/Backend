import {Collection, Entity,ManyToMany,ManyToOne,PrimaryKey,PrimaryKeyType,Property,Rel } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { ShowContent } from "../showContent/showContent.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";


@Entity()
export class List extends BaseEntity {
            
    @Property({nullable: false})
    nameList!: string;

    @Property({nullable: false})
    descriptionList!: string;

    // Relación many-to-many con ShowContent, declarada como el dueño (side owning)
    @ManyToMany(() => ShowContent, showContent => showContent.lists, {owner: true})
    contents = new Collection<ShowContent>(this);

    @ManyToOne(() => User, {nullable: false})
    owner!: Rel<User>;

    @ManyToMany(() => User, user => user.followingLists)
    followers = new Collection<User>(this);
}
    

