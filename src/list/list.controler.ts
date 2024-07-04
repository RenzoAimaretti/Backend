import { ListRepository } from "./list.repository.js"
import { UserRepository } from "../user/user.repository.js";
import { Request,Response,NextFunction } from "express";
import { List } from "./list.entity.js";

const repository = new ListRepository();
const userrepository = new UserRepository();

function sanitizeListInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        name_list: req.body.name_list,
        contents: req.body.contents,
        owner: req.body.owner,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined)
        delete req.body.sanitizedInput[key];
    });
    next();
};

function findAll(req:Request, res:Response){
    res.json({data:repository.findAll()})
};

function findOne(req:Request, res:Response){
    const idRequest = req.params.owner
    const name_listRequest = req.params.name_list
    const list = repository.findOne({id:idRequest , attrs:name_listRequest});
    if (list){
        return res.json({data:list});
    }else{
        res.status(404).send('list not found');
    }
    };

function addOne(req:Request, res: Response){
    const input = req.body.sanitizedInput;
    const newList = new List(input.name_list, input.contents, input.owner);
    const addedList = repository.add(newList)
    return res.status(201).send({Message:"List created", data:addedList})
};

function updateOne(req:Request, res:Response){
    req.body.sanitizedInput.id=req.params.owner;
    const updatedList = repository.update(req.body.sanitizedInput);
    if(!updatedList){
        return res.status(404).send("List not found")
    }
    else{return res.status(200).send({Message: "List updated", data: updatedList})}
}

function deleteOne(req:Request,res:Response){
    const deletedList=repository.delete({id: req.params.owner, attrs:req.params.name_list});
    if(!deletedList) {return res.status(404).send("List not found")}
    else{
        const owner = userrepository.findOne({id: deletedList.owner})
        if (owner){
        const index = owner.list.findIndex(list=>list.name_list===deletedList.name_list)

        if (index!=-1){
            owner.list.splice(index,1)}
            userrepository.update(owner)
        return res.status(200).send({Messaeg:"List deleted", data: deletedList})}
    }
}
export {sanitizeListInput, findAll, findOne, addOne, updateOne, deleteOne}