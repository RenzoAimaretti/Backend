import { Repository } from "../shared/repository.js";
import { List } from "./list.entity.js";

const lists:List[] = [new List('ListaPrueba',[],'df01afd4-2560-4581-93c3-33ed77d3b091')]

export class ListRepository implements Repository<List>{
    public findAll(): List[] {
        return lists;
    }

    public findOne(item: { id: string, attrs:string }): List | undefined {
        return lists.find((list) => (list.user_id === item.id && list.name_list===item.attrs));
    }

    public add(item: List): List | undefined {
        lists.push(item);
        return item;
    }

    public update(item: List): List | undefined {
        const index = lists.findIndex(list => (list.user_id === item.user_id && list.name_list===item.name_list))
        if (index !== -1) {
            lists[index] = { ...lists[index], ...item }
            return lists[index];
        };
    }

    public delete(item: { id: string, attrs:string }): List | undefined {
        const index = lists.findIndex(list => (list.user_id === item.id && list.name_list===item.attrs));
        if (index !== -1) {
            const deletedList = lists[index];
            lists.splice(index, 1);
            return deletedList;
        }
    }

}