import { Request,Response,NextFunction } from "express";
import { Subscription } from "./subscription.entity.js";


async function sanitizeUserInput(req: Request , res: Response , next:NextFunction) {
next()
};
async function findAll(req: Request,res: Response){
    throw Error('Not implemented yet');
};

//consultar por id
async function findOne(req: Request,res: Response){
    throw Error('Not implemented yet');
};

//añadir uno nuevo
async function addOne(req: Request,res: Response){
    throw Error('Not implemented yet');
};

//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req: Request,res: Response){
    throw Error('Not implemented yet'); 
};

//borrar un character
async function deleteOne (req:Request,res:Response){
    throw Error('Not implemented yet');
};
export {sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne}