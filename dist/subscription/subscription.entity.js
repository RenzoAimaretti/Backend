var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { User } from "../user/user.entity.js";
let Subscription = class Subscription extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Subscription.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Subscription.prototype, "cantidadSem", void 0);
__decorate([
    OneToMany(() => User, user => user.subscription, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Array)
], Subscription.prototype, "users", void 0);
Subscription = __decorate([
    Entity()
], Subscription);
export { Subscription };
//# sourceMappingURL=subscription.entity.js.map