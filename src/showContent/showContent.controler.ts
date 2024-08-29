import { Request,Response,NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";

const em = orm.em

async function findOneContent(req:Request,res:Response) {
    try {
        const idContent = Number.parseInt(req.params.idContent)
        const showContent = await em.findOneOrFail(ShowContent, {idContent}, {populate:['lists']})
        return showContent as ShowContent
    } catch (error:any) {
        return null
    }
    
}

async function addOneContent(req:Request,res:Response){
    try {
        const showContent = new ShowContent()
        showContent.idContent = Number.parseInt(req.params.idContent)
        showContent.nameContent = req.body.nameContent
        await em.persistAndFlush(showContent)
    } catch (error:any) {
    }
}

async function updateOneContent(req:Request, res:Response){
    try {
        const idContent = Number.parseInt(req.params.idContent)
        const showContent = await em.findOneOrFail(ShowContent, {idContent})
        showContent.nameContent = req.body.nameContent
        await em.persistAndFlush(showContent)
        res.status(200).json({message:'showContent updated',data:showContent})
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

async function deleteOneContent(req:Request,res:Response){
    try {
        const idContent = Number.parseInt(req.params.id)
        const showContent = await em.findOneOrFail(ShowContent, {idContent})
        em.removeAndFlush(showContent)
        res.status(200).json({message:'showContent deleted',data:showContent})
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export {findOneContent,addOneContent,updateOneContent,deleteOneContent}