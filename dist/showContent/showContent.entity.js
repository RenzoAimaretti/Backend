var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Entity, ManyToMany, Collection, PrimaryKey, Property } from "@mikro-orm/core";
import { List } from "../list/list.entity.js";
let ShowContent = class ShowContent {
    constructor() {
        this.lists = new Collection(this);
    }
};
__decorate([
    PrimaryKey({ autoincrement: false }),
    __metadata("design:type", Number)
], ShowContent.prototype, "idContent", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], ShowContent.prototype, "nameContent", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Array)
], ShowContent.prototype, "tags", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], ShowContent.prototype, "duration", void 0);
__decorate([
    ManyToMany(() => List, list => list.contents, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], ShowContent.prototype, "lists", void 0);
ShowContent = __decorate([
    Entity()
], ShowContent);
export { ShowContent };
//# sourceMappingURL=showContent.entity.js.map