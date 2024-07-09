import crypto from 'node:crypto';
export class Cinerange {
    constructor(id_range = crypto.randomUUID(), name_range, desc_range) {
        this.id_range = id_range;
        this.name_range = name_range;
        this.desc_range = desc_range;
    }
}
//# sourceMappingURL=cinerange.entity.js.map