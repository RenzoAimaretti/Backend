var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Collection, Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { ShowContent } from "../showContent/showContent.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
let List = class List extends BaseEntity {
    constructor() {
        super(...arguments);
        this.contents = new Collection(this);
        /*
        @Property({nullable:true})
        duration: ???
        no se que tipo de dato es y todavia hay q pensar la implementacion
        */
        this.followers = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], List.prototype, "nameList", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], List.prototype, "descriptionList", void 0);
__decorate([
    ManyToMany(() => ShowContent, showContent => showContent.lists, { owner: true }),
    __metadata("design:type", Object)
], List.prototype, "contents", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false, autoincrement: false }),
    __metadata("design:type", Object)
], List.prototype, "owner", void 0);
__decorate([
    ManyToMany(() => User, user => user.followingLists),
    __metadata("design:type", Object)
], List.prototype, "followers", void 0);
List = __decorate([
    Entity()
], List);
export { List };
//# sourceMappingURL=list.entity.js.map