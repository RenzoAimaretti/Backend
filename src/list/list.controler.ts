
import { Request,Response,NextFunction } from "express";
import { List } from "./list.entity.js";


function sanitizeListInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        name_list: req.body.name_list,
        contents: req.body.contents,
        user_id: req.body.user_id,
        new_name:req.body.new_name
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined)
        delete req.body.sanitizedInput[key];
    });
    next();
};

function findAll(req:Request, res:Response){
    throw Error('Not implemented yet');
};

function findOne(req:Request, res:Response){
    throw Error('Not implemented yet');
};

function addOne(req: Request, res: Response) {
    throw Error('Not implemented yet');
};

function updateOne(req:Request, res:Response){
    throw Error('Not implemented yet');
};

function deleteOne(req:Request,res:Response){
    throw Error('Not implemented yet');
};

export {sanitizeListInput, findAll, findOne, addOne, deleteOne, updateOne}