export class User{
    constructor(
        public name:string,
        public password:string,
        public friends:string[],
        public lists:string[],
        //cambio de tipo de lists de list[] a string []
        public id?:number
    ){

    }
}