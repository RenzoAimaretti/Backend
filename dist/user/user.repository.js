import { Usuario } from "./user.js";
const users = [
    new Usuario('Miguelazo232', '123456', [], []),
    new Usuario('JuanchOcan4lla1889', '32737', ['joseLepra2006'], []),
    new Usuario('joseLepra2006', '456789', ['JuanchOcan4lla'], [])
];
export class UserRepository {
    findAll() {
        return users;
    }
    findOne(item) {
        return users.find((user) => user.id === item.id);
    }
    add(item) {
        users.push(item);
        return item;
    }
    update(item) {
        const index = users.findIndex(user => user.id === item.id);
        if (index !== -1) {
            users[index] = { ...users[index], ...item };
            return users[index];
        }
    }
    delete(item) {
        const index = users.findIndex(user => user.id === item.id);
        if (index !== -1) {
            const deletedUser = users[index];
            users.splice(index, 1);
            return deletedUser;
        }
    }
}
//# sourceMappingURL=user.repository.js.map