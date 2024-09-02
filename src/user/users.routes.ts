import { Router } from "express";
import { findAll, findOne, deleteOne, updateOne, userLists } from "./user.controler.js";
import { verifyToken } from "../shared/session/verifyToken.js";
export const userRouter=Router();

userRouter.get('/',findAll);

userRouter.get('/:id',findOne);

userRouter.put('/:id',verifyToken,updateOne);

userRouter.patch('/:id',verifyToken,updateOne);

userRouter.delete('/:id',verifyToken,deleteOne);

userRouter.get('/:id/lists',verifyToken,userLists);