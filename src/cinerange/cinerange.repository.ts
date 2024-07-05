import { Repository } from "../shared/repository.js";
import { Cinerange } from "./cinerange.entity.js";

export class CinerangeRepository implements Repository<Cinerange>	{
    public findAll(): Cinerange[] | undefined {
    throw "en construccion"    
    }
    public findOne(item:  {id: string}): Cinerange | undefined {
    throw "en construccion"    
    }
    public update(item: Cinerange): Cinerange | undefined {
    throw "en construccion"    
    }
    public add(item: Cinerange): Cinerange | undefined {
    throw "en construccion"
    }
    public delete(item: {id: string}): Cinerange | undefined {
    throw "en construccion"
    }
}