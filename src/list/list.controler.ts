import { ListRepository } from "./list.repository.js"
import { UserRepository } from "../user/user.repository.js";
import { Request,Response,NextFunction } from "express";
import { List } from "./list.entity.js";


const repository = new ListRepository();
const userRepository = new UserRepository();

function sanitizeListInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        name_list: req.body.name_list,
        contents: req.body.contents,
        user_id: req.body.user_id,
    };
    console.log(req.body.sanitizedInput)

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined)
        delete req.body.sanitizedInput[key];
    });
    console.log(req.body.sanitizedInput)

    next();
};

function findAll(req:Request, res:Response){
    res.json({data:repository.findAll()})
};

function findOne(req:Request, res:Response){
    
    };

function addOne(req: Request, res: Response) {
    const id=req.params.user_id
    const input = req.body.sanitizedInput;
    const owner = userRepository.findOne({ id: id });
    console.log(owner)

    if (!owner) {
        return res.status(404).send("User not found");
    } else {
        input.user_id=id
        const newList = new List(input.name_list, input.contents, input.user_id);
        const addedList = repository.add(newList);
        console.log(addedList)
        owner.list.push(newList);
        userRepository.update(owner);
        return res.status(201).send({ Message: "List created", data: addedList });
    }

    
};

function updateOne(req:Request, res:Response){
    return res.status(201).send({ Message: "Funcionalidad no terminada" });
};

function deleteOne(req:Request,res:Response){
    return res.status(201).send({ Message: "Funcionalidad no terminada" });
};


export {sanitizeListInput, findAll, findOne, addOne, deleteOne, updateOne}