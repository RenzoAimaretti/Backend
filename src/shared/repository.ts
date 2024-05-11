export interface Repository<T> {
    findAll() :T[] | undefined
    findOne(item:{id:string}): T | undefined
    //El elemento recibido DEBE tener un id, pero no restringimos el resto de atributos
    add(item:T): T | undefined
    update(item:T): T | undefined
    delete(item:{id:string}): T | undefined
}
//Permite implementarlos para todos los repositorios