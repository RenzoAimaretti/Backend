import crypto from 'node:crypto';
export class Usuario {
    constructor(nombre, constraseña, amigos, listas, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.constraseña = constraseña;
        this.amigos = amigos;
        this.listas = listas;
        this.id = id;
    }
}
//# sourceMappingURL=user.entity.js.map