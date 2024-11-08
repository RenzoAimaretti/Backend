import { Request,Response } from "express";
import { Subscription} from "./subscription.entity.js";
import { orm } from "../shared/db/orm.js";
import { User } from "../user/user.entity.js";

const em = orm.em

async function searchSubscription(req: Request, res: Response) {
    try {
        const query = req.query.name as string;

        if (typeof query === 'string' && query.trim()) {
            
            const subscriptions = await em.find(Subscription, {
                name: { $like: `%${query}%` } 
            }, { populate: [] });

            res.status(200).json({ message: 'subscriptions found', data: subscriptions });
        } else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
async function findAll(req: Request,res: Response){
  try{
    const subscriptions=await em.find(Subscription,{})
    res.status(200).json({message:'found all subscriptions',data:subscriptions})
 } catch (error:any){
        res.status(200).json({message: error.message})}
}


async function findOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const subscription = await em.findOneOrFail(Subscription, {id})
        res.status(200).json({message:'user found',data:subscription})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
};


async function addOne(req: Request, res: Response) {
    console.log('Datos recibidos para crear la suscripción:', req.body); 
    try {
        const subscription = em.create(Subscription, req.body);
        em.persist(subscription); 
        await em.flush();
        console.log('Subscripción creada en la base de datos:', subscription); 
        res.status(201).json({ message: 'subscription created', data: subscription });
    } catch (error: any) {
        console.error('Error al crear la subscripción:', error); 
        res.status(500).json({ message: error.message });
    }    
}



async function updateOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const subscriptionToUpdate = await em.getReference(Subscription, id)
        em.assign(subscriptionToUpdate, req.body)
        await em.flush()
        res.status(200).json({message:'subscription updated', data:subscriptionToUpdate})
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
};


async function deleteOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const subscriptionToDelete = await em.findOneOrFail(Subscription, { id });
        const defaultSubscription = await em.findOneOrFail(Subscription, { id: 1 });
        
        const usersWithSubscription = await em.find(User, { subscription: subscriptionToDelete });
        let movedUsers = false;

        if (usersWithSubscription.length > 0) {
            movedUsers = true;
            usersWithSubscription.forEach(user => {
                user.subscription = defaultSubscription;
            });
            await em.flush(); 
        }

        await em.removeAndFlush(subscriptionToDelete);

        
        const message = movedUsers 
            ? 'Subscripción eliminada con éxito y los usuarios que la tenian fueron reasignados a la subscripción por defecto.'
            : 'Subscripción eliminada con éxito';

        console.log(message);
        
        res.status(200).json({ 
            message, 
            data: subscriptionToDelete 
        });
    } catch (error: any) {
        console.error('Error al eliminar la suscripción:', error); 
        res.status(500).json({ message: error.message });
    }
}



export { findAll, findOne, addOne, updateOne, deleteOne,searchSubscription}