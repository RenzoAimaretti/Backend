export class Usuario{
    constructor(public nombre: string, public apellido: string, public edad: number, public email: string, public password: string, public genero: string, public telefono: string, public direccion: string, public ciudad: string, public pais: string, public codigoPostal: string, public fechaNacimiento: string, public estado: string, public rol: string, public id?: number){
    }
}