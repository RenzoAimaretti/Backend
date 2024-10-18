import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./rangoCinefilo.controler.js";
import { isAdminMiddleware } from '../middlewares/adminMiddleware.js'; 
export const rangoRouter=Router();

rangoRouter.get('/',findAll);

rangoRouter.get('/:id',findOne);

rangoRouter.post('/', isAdminMiddleware, addOne);

rangoRouter.put('/:id', isAdminMiddleware, updateOne);

rangoRouter.delete('/:id', isAdminMiddleware, deleteOne);