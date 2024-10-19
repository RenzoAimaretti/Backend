import { Request,Response,NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";
import { create } from "domain";

const em = orm.em

async function findOneContent(req:Request,res:Response) {
    try {
        console.log("body que llega al find one content",req.body)
        console.log("los parametros que llegan sonnnn:::",req.params)
        if(req.params.idContent!==undefined){
        const idContent = Number.parseInt(req.params.idContent)
        const showContent = await em.findOneOrFail(ShowContent, {idContent}, {populate:['lists']})
        return showContent as ShowContent}
        else {
            console.log("entroooooo al else")
            const idContent = Number.parseInt(req.body.id)
            console.log("el id content que tenemos en el find one content",idContent)
            const showContent = await em.findOneOrFail(ShowContent, {idContent}, {populate:['lists']})
            console.log("el show content que tenemos en el find one content",showContent)
            return showContent as ShowContent
        }
    } catch (error:any) {
        return null
    }
    
}

async function addOneContent(req:Request,res:Response){
    try {
        let showContent = new ShowContent();
        if(req.params.idContent!==undefined){
            showContent.idContent = Number.parseInt(req.params.idContent)
            showContent.nameContent = req.body.nameContent      
        } else {
            showContent.idContent = Number.parseInt(req.body.id)
            showContent.nameContent = req.body.title
            console.log(req.body.title, req.body.id)
        }
        const createdContent = em.create(ShowContent, showContent)
        console.log('createdContent',createdContent)
        await em.persistAndFlush(createdContent)
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