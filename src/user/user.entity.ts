import crypto from 'node:crypto'
export class Usuario{
    constructor(
        public nombre:string,
        public clave:string,
        public amigos:string[],
        public listas:object[],
        public id=crypto.randomUUID()
    ){

    }
}