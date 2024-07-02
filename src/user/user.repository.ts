import { Repository	} from "../shared/repository.js";
import { User } from "./user.entity.js";
//Esta capa corresponde al acceso a los datos, no a la santitizacion ni validaciones respectivas.
const users=[
    new User('Miguelazo232', '123456',[],[]),
    new User('JuanchOcan4lla1889', '32737',['joseLepra2006'],[]),
    new User('joseLepra2006', '456789',['JuanchOcan4lla'],[])]

export class UserRepository implements Repository<User>{
    public  findAll(): User[] {
        return users;
    }
    
    public findOne(item: { id: string; }): User | undefined {
        return users.find((user)=>user.id===item.id);
    }

    public add(item: User): User | undefined {
        users.push(item);
        return item;
    }
    public update(item:User): User | undefined {
        const index= users.findIndex(user=>user.id===item.id)
        if (index!==-1){
            users[index]={...users[index],...item}
            return users[index];
        };
        
    }
    public delete(item: { id: string;}): User | undefined{
        const index = users.findIndex(user=>user.id===item.id);
        if (index!==-1){
            const deletedUser = users[index];
            users.splice(index,1);
            return deletedUser;
        }
    }
}