import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./subscription.controler.js";//sanitizeUserInput
import { isAdminMiddleware } from '../middlewares/adminMiddleware.js'; 

export const subscriptionRouter=Router();

subscriptionRouter.get('/',findAll);

subscriptionRouter.get('/:id',findOne);


subscriptionRouter.post('/', isAdminMiddleware, addOne);


subscriptionRouter.put('/:id', isAdminMiddleware, updateOne);


subscriptionRouter.delete('/:id', isAdminMiddleware, deleteOne);