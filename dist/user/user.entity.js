import crypto from 'node:crypto';
export class User {
    constructor(name, password, friends, list, id = crypto.randomUUID()) {
        this.name = name;
        this.password = password;
        this.friends = friends;
        this.list = list;
        this.id = id;
    }
}
//# sourceMappingURL=user.entity.js.map