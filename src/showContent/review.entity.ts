import {
  Entity,
  Cascade,
  Property,
  ManyToOne,
  PrimaryKeyType,
  PrimaryKeyProp,
  ManyToMany,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { ShowContent } from "./showContent.entity.js";
import { Comment } from "./comment.entity.js";

@Entity()
export class Review {
  @Property({ nullable: false })
  rating!: number;

  @Property({ nullable: true })
  description!: string;

  @ManyToOne(() => User, { nullable: false, primary: true })
  reviewOwner!: User;

  @ManyToOne(() => ShowContent, { nullable: false, primary: true })
  showReviewd!: ShowContent;

  @OneToMany(() => Comment, (comment) => comment.commentReview, {
    cascade: [Cascade.ALL],
    nullable: true,
  })
  comments = new Collection<Comment>(this);
}
