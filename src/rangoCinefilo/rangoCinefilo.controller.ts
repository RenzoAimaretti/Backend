import { Request,Response,NextFunction } from "express";
import { RangoCinefilo } from "./rangoCinefilo.entity.js";
import { orm } from "../shared/db/orm.js";
import { User } from "../user/user.entity.js";

const em = orm.em


async function searchRangoCinefilo(req: Request, res: Response) {
    try {
        const query = req.query.nameRango as string;

        if (typeof query === 'string' && query.trim()) {
            
            const rangoscinefilos = await em.find(RangoCinefilo, {
                nameRango: { $like: `%${query}%` } 
            }, { populate: [] });

            res.status(200).json({ message: 'Rangos cinefilos found', data: rangoscinefilos });
        } else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findAll(req: Request,res: Response){
    try {
        const range= await em.find(RangoCinefilo,{})
        res.status(200).json({message:'all range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};


async function findOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const range = await em.findOneOrFail(RangoCinefilo,{id})
        res.status(200).json({message:'range found',data:range})
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
};

async function addOne(req: Request, res: Response) {
    try {
        
        const { nameRango, descriptionRango, minReviews } = req.body;

        
        if (!nameRango || !descriptionRango || minReviews === undefined) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

       
        const rango = em.create(RangoCinefilo, {
            nameRango,
            descriptionRango,
            minReviews, 
        });

        await em.flush();
        res.status(201).json({ message: 'Rango creado con éxito', data: rango });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


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


async function deleteOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const rangoAEliminar = await em.findOneOrFail(RangoCinefilo, { id });
        const rangoPredeterminado = await em.findOneOrFail(RangoCinefilo, { id: 1 });
        const usuariosConRango = await em.find(User, { rangoCinefilo: rangoAEliminar });
        let movedUsers = false;
        if (usuariosConRango.length > 0) {
            movedUsers = true;
            usuariosConRango.forEach(usuario => {
                usuario.rangoCinefilo = rangoPredeterminado;
            });
            await em.flush(); 
        }
        await em.removeAndFlush(rangoAEliminar);
        const message = movedUsers 
            ? 'Rango eliminado con éxito y los usuarios que lo tenían fueron reasignados al rango predeterminado.'
            : 'Rango eliminado con éxito.';
        res.status(200).json({ message, data: rangoAEliminar });
    } catch (error: any) {
        console.error('Error al eliminar el rango cinefilo:', error);
        res.status(500).json({ message: 'Error al eliminar el rango cinefilo. ' + error.message });
    }
}

export { findAll, findOne, addOne, updateOne, deleteOne,searchRangoCinefilo}
