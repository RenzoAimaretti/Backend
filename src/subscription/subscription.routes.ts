import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "subscription.controler.js";//sanitizeUserInput

export const subscriptionRouter=Router();

subscriptionRouter.get('/',findAll);

subscriptionRouter.get('/:id',findOne);

subscriptionRouter.post('/',addOne);//sanitizeUserInput

subscriptionRouter.put('/:id',updateOne);//sanitizeUserInput

subscriptionRouter.patch('/:id',updateOne);//sanitizeUserInput

subscriptionRouter.delete('/:id',deleteOne);