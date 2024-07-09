var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Collection, Entity, ManyToOne, ManyToMany, OneToMany, Property } from "@mikro-orm/core";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { List } from "../list/list.entity.js";
let User = class User extends BaseEntity {
    constructor() {
        super(...arguments);
        this.lists = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    ManyToOne(() => RangoCinefilo, { nullable: false }),
    __metadata("design:type", Object)
], User.prototype, "rangoCinefilo", void 0);
__decorate([
    OneToMany(() => List, list => list.owner, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], User.prototype, "lists", void 0);
__decorate([
    ManyToMany(() => List, list => list.followers, { cascade: [Cascade.ALL], owner: true }),
    __metadata("design:type", Array)
], User.prototype, "followingLists", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map