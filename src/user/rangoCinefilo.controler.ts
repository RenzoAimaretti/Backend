import { Request,Response,NextFunction } from "express";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { orm } from "../mikro-orm.config.js";

const em = orm.em


async function findAll(req: Request,res: Response){
    try {
        const range= await em.find(RangoCinefilo,{})
        res.status(200).json({message:'all range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//consultar por id
async function findOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const range = await em.findOneOrFail(RangoCinefilo,{id})
        res.status(200).json({message:'range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//añadir uno nuevo
async function addOne(req: Request,res: Response){
    try {
        const range = em.create(RangoCinefilo, req.body)
        await em.flush()
        res.status(201).json({message:'range created',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const rangeToUpadte = await em.findOneOrFail(RangoCinefilo,{id})
        em.assign(rangeToUpadte, req.body)
        await em.flush()
        res.status(200).json({message:'range updated', data:rangeToUpadte})
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
};

//borrar un character
async function deleteOne (req:Request,res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const range = em.getReference(RangoCinefilo, id)
        await em.removeAndFlush(range)
        res.status(200).json({message:'range delated', data:range})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
};
export { findAll, findOne, addOne, updateOne, deleteOne}