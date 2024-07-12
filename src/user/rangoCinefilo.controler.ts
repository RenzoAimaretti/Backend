import { Request,Response,NextFunction } from "express";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { orm } from "../shared/db/orm.js";
import { User } from "./user.entity.js";

const em = orm.em

async function sanitizeUserInput(req: Request , res: Response , next:NextFunction) {
    req.body.sanitizedInput = {
       nameRango: req.body.nameRango,
       desctripitonRango: req.body.descriptionRango,
       users: req.body.users
       };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        }
    });
    next(); 

};
async function findAll(req: Request,res: Response){
    try {
        const range= await em.find(RangoCinefilo,{},{populate:['users']})
        res.status(200).json({message:'all range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//consultar por id
async function findOne(req: Request,res: Response){
    try {
        const nameRango = req.params.nameRango
        const range = await em.findOneOrFail(RangoCinefilo,{nameRango},{populate:['users']})
        res.status(200).json({message:'range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//añadir uno nuevo
async function addOne(req: Request,res: Response){
    try {
        const range = em.create(RangoCinefilo, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message:'range created',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req: Request,res: Response){
    try {
        const nameRango = req.params.nameRango
        const userId = Number.parseInt(req.params.userId)
        const userToadd = em.getReference(User,userId)
        const rangeToUpadte = await em.findOneOrFail(RangoCinefilo,{nameRango})
        if (!req.body.sanitizedInput){
        em.assign(rangeToUpadte, req.body.sanitizedInput)}
        rangeToUpadte.users.add(userToadd)
        await em.flush()
        res.status(200).json({message:'range updated'})
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
};

//borrar un character
async function deleteOne (req:Request,res:Response){
    try {
        const name = Number.parseInt(req.params.nameRango)
        const range = em.getReference(RangoCinefilo, name)
        await em.removeAndFlush(range)
        res.status(200).json({message:'range delated'})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
};
export {sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne}