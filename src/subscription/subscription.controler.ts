import { Request,Response,NextFunction } from "express";
import { Subscription} from "./subscription.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em


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


async function addOne(req: Request,res: Response){
    try {
        const subscription = em.create(Subscription, req.body)
        await em.flush
        res.status(201).json({message:'subscription created', data:subscription})
    } catch (error:any) {
        res.status(500).json({message: error.message})  
    }    
};


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


async function deleteOne (req:Request,res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const subscription = await em.getReference(Subscription, id)
        await em.removeAndFlush(subscription)
        res.status(200).json({message:'subscription deleted'})  
    } catch (error:any) {
            res.status(500).json({message:error.message})
        }
};
export {sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne}