import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./rangoCinefilo.controler.js";

export const rangoRouter=Router();

rangoRouter.get('/',findAll);

rangoRouter.get('/:id',findOne);

rangoRouter.post('/',addOne);

rangoRouter.put('/:id',updateOne);

rangoRouter.delete('/:id',deleteOne);