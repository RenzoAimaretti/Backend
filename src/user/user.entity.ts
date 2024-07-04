import crypto from 'node:crypto'
import { List } from '../list/list.entity'
export class User{
    constructor(
        public name:string,
        public password:string,
        public friends:string[],
        public list:List[],
        public id=crypto.randomUUID()
    ){

    }
}