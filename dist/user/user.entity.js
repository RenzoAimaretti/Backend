import crypto from 'node:crypto';
export class Usuario {
    constructor(nombre, clave, amigos, listas, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.clave = clave;
        this.amigos = amigos;
        this.listas = listas;
        this.id = id;
    }
}
//# sourceMappingURL=user.entity.js.map