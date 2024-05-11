import { Repository	} from "../shared/repository.js";
import { Usuario } from "./user.entity.js";
//Esta capa corresponde al acceso a los datos, no a la santitizacion ni validaciones respectivas.
const users=[
    new Usuario('Miguelazo232', '123456',[],[]),
    new Usuario('JuanchOcan4lla1889', '32737',['joseLepra2006'],[]),
    new Usuario('joseLepra2006', '456789',['JuanchOcan4lla'],[])]

export class UserRepository implements Repository<Usuario>{
    public  findAll(): Usuario[] {
        return users;
    }
    
    public findOne(item: { id: string; }): Usuario | undefined {
        return users.find((user)=>user.id===item.id);
    }

    public add(item: Usuario): Usuario | undefined {
        users.push(item);
        return item;
    }
    public update(item:Usuario): Usuario | undefined {
        const index= users.findIndex(user=>user.id===item.id)
        if (index!==-1){
            users[index]={...users[index],...item}
            return users[index];
        };
        
    }
    public delete(item: { id: string;}): Usuario | undefined{
        const index = users.findIndex(user=>user.id===item.id);
        if (index!==-1){
            const deletedUser = users[index];
            users.splice(index,1);
            return deletedUser;
        }
    }
}