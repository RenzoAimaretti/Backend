export interface Repository<T> {
    findAll(): T[] | undefined;
    findOne(item: { id: string, attrs: any }): T | undefined;
    add(item: T): T | undefined;
    update(item: T): T | undefined;
    delete(item: { id: string, attrs: any }): T | undefined;
}
//Permite implementarlos para todos los repositorios