import { Router } from "express";
import { findAll, findOne, deleteOne, updateOne, searchUsers,followUser } from "./user.controler.js";
import { verifyToken } from "../shared/session/verifyToken.js";
export const userRouter=Router();

userRouter.get('/search', searchUsers);


userRouter.get('/',findAll);

userRouter.get('/:id',findOne);

userRouter.put('/:id',verifyToken,updateOne);

userRouter.patch('/:id',verifyToken,updateOne);

userRouter.delete('/:id',verifyToken,deleteOne);

userRouter.post('/follow/:userId/:idF', verifyToken, followUser);