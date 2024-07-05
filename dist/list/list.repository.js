import { List } from "./list.entity.js";
const lists = [new List('ListaPrueba', [], 'df01afd4-2560-4581-93c3-33ed77d3b091')];
export class ListRepository {
    findAll() {
        return lists;
    }
    findOne(item) {
        return lists.find((list) => (list.user_id === item.id && list.name_list === item.attrs));
    }
    add(item) {
        lists.push(item);
        return item;
    }
    update(item) {
        //FALTA UNA VARIABLE PARA GUARDAR EL NOMBRE VIEJO POR QUE SINO NO PODEMOS BUSCAR
        //HAY Q FILTRAR RESPECTO DEL NOMBRE VIEJO!!!
        const index = lists.findIndex(list => (list.user_id === item.user_id && list.name_list === item.name_list));
        if (index !== -1) {
            lists[index].user_id = item.user_id;
            lists[index].name_list = item.name_list;
            return lists[index];
        }
        return undefined; // Add this line to handle the case when the list is not found
    }
    delete(item) {
        const index = lists.findIndex(list => (list.user_id === item.id && list.name_list === item.attrs));
        if (index !== -1) {
            const deletedList = lists[index];
            lists.splice(index, 1);
            return deletedList;
        }
    }
}
//# sourceMappingURL=list.repository.js.map