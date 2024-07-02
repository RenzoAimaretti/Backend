import crypto from 'node:crypto'
export class User{
    constructor(
        public name:string,
        public password:string,
        public friends:string[],
        public list:object[],
        public id=crypto.randomUUID()
    ){

    }
}