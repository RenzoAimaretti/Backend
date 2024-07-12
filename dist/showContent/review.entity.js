var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Cascade, Property, ManyToOne, OneToMany } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { ShowContent } from "./showContent.entity.js";
import { Comment } from "./comment.entity.js";
let Review = class Review {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Review.prototype, "description", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false, primary: true }),
    __metadata("design:type", User)
], Review.prototype, "reviewOwner", void 0);
__decorate([
    ManyToOne(() => ShowContent, { nullable: false, primary: true }),
    __metadata("design:type", ShowContent)
], Review.prototype, "showReviewd", void 0);
__decorate([
    OneToMany(() => Comment, comment => comment.commentReview, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Array)
], Review.prototype, "comments", void 0);
Review = __decorate([
    Entity()
], Review);
export { Review };
//# sourceMappingURL=review.entity.js.map