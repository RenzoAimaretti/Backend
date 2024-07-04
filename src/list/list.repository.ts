import { Repository } from "../shared/repository";
import { List } from "./list.entity";

const lists = []

export class ListRepository implements Repository<List>{
    public findAll(): List[] {
        return lists;
    }

    public findOne(item: { id: string, attrs:string }): List | undefined {
        return lists.find((list) => (list.owner === item.id && list.name_list===item.attrs));
    }

    public add(item: List): List | undefined {
        lists.push(item);
        return item;
    }

    public update(item: List): List | undefined {
        const index = lists.findIndex(list => (list.owner === item.owner && list.name_list===item.name_list))
        if (index !== -1) {
            lists[index] = { ...lists[index], ...item }
            return lists[index];
        };
    }

    public delete(item: { id: string, attrs:string }): List | undefined {
        /* 
        repository:
        paso 1: eliminamos la lista 
        paso 2: devolvemos la lista
        controller:
        paso 3: de esa lista guardar en una variable el id del owner
        paso 4: hacemos el user get one con ese id
        paso 5: recuperamos el array de lists del usuario
        paso 6: ELIMINAMOS LA LISTA ACTUAL DEL ARRAY Y ACTUALIZAMOS EL USUARIO
        
        
         
         */
        const index = lists.findIndex(list => (list.owner === item.id && list.name_list===item.attrs));
        if (index !== -1) {
            const deletedList = lists[index];
            lists.splice(index, 1);
            return deletedList;
        }
    }

}