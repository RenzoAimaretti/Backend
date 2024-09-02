import { Request, Response } from "express";
import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "../showContent/showContent.entity.js";
import { addOneContent, findOneContent } from "../showContent/showContent.controler.js";
const em = orm.em;


async function searchLists(req: Request, res: Response) {
    try {
        const query = req.query.nameList as string;

        if (typeof query === 'string' && query.trim()) {
            // Buscar listas cuyo nombre contenga el valor de 'query'
            const lists = await em.find(List, {
                nameList: { $like: `%${query}%` } // Esto es correcto
            }, { populate: ['contents', 'owner', 'followers'] });

            res.status(200).json({ message: 'Lists found', data: lists });
        } else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function addContent(req: Request, res:Response){
    try{
        const listId = Number.parseInt(req.params.idList);
        const content = await findOneContent(req,res)
        const list = await em.findOneOrFail(List, { id: listId }, { populate: ['contents'] });
        if (content!=null) {
            if (list.contents.contains(content)) {
            res.status(400).json({ message: 'content already in list' });
        }else{
            list.contents.add(content);
            await em.persistAndFlush(list);
        }
    }else{
        addOneContent(req,res)
        const content = await findOneContent(req,res) as ShowContent
        list.contents.add(content);
        await em.persistAndFlush(list);
    }
    res.status(200).json({message:'content added to list',data:list});  
}catch(error:any){
    res.status(500).json({message: error.message});
}
}

async function findAll(req: Request, res: Response) {
    try {
        const lists = await em.find(List, {}, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'found all lists', data: lists });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const list = await em.findOneOrFail(List, { id }, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'list found', data: list });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function addOne(req: Request, res: Response) {
    try {
        const list = em.create(List, req.body); // sanitización pendiente
        await em.flush();
        res.status(201).json({ message: 'list created', data: list });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }    
}

async function deleteOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const list = em.getReference(List, id);
        await em.removeAndFlush(list);
        res.status(200).json({ message: 'list deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

function updateOne(req: Request, res: Response) {
    throw Error('Not implemented yet');
}

export { findAll, findOne, addOne, deleteOne, updateOne, searchLists, addContent };
