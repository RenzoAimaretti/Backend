import { Request, Response } from "express";
import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

// Función para buscar listas basado en el nombre
async function searchLists(req: Request, res: Response) {
    try {
        const query = req.query.nameList as string;

        if (typeof query === 'string' && query.trim()) {
            // Busca listas cuyo nombre empiece con el valor de 'query'
            const lists = await em.find(List, {
                nameList: {
                    $like: `${query}%`
                }
            }, { populate: ['contents', 'owner', 'followers'] });

            res.status(200).json({ message: 'Lists found', data: lists });
        } else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
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

export { findAll, findOne, addOne, deleteOne, updateOne, searchLists };
