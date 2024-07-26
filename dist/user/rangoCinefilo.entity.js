var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
let RangoCinefilo = class RangoCinefilo extends BaseEntity {
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], RangoCinefilo.prototype, "nameRango", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], RangoCinefilo.prototype, "descriptionRango", void 0);
RangoCinefilo = __decorate([
    Entity()
], RangoCinefilo);
export { RangoCinefilo };
//# sourceMappingURL=rangoCinefilo.entity.js.map