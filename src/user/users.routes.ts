import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./user.controler.js";

export const userRouter=Router();

userRouter.get('/',findAll);

userRouter.get('/:id',findOne);

userRouter.post('/',addOne);

userRouter.put('/:id',updateOne);

userRouter.patch('/:id',updateOne);

userRouter.delete('/:id',deleteOne);