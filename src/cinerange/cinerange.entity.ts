import crypto from 'node:crypto'

export class Cinerange{
    constructor(
        public id_range=crypto.randomUUID(),
        public name_range:string,
        public desc_range:string
    ){}
}