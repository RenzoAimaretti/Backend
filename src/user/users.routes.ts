import { Router } from "express";
import { findAll, findOne, deleteOne, updateOne, searchUsers,followUser, unfollowUser, isFollowing } from "./user.controler.js";
import { verifyToken } from "../shared/session/verifyToken.js";
export const userRouter=Router();

userRouter.get('/search', searchUsers);


userRouter.get('/',findAll);

userRouter.get('/:id',findOne);

userRouter.put('/:id',verifyToken,updateOne);

userRouter.patch('/:id',verifyToken,updateOne);

userRouter.delete('/:id',verifyToken,deleteOne);

userRouter.post('/follow/:userId/:idF', verifyToken, followUser);

userRouter.post('/unfollow/:userId/:idF',verifyToken,unfollowUser);

//creo que para este ni haria falta el verify token, se podria llegar a reutilizar para que un usuario X
//pueda ver si por ejemplo el usuario Y esta sigueiendo al usuario Z
userRouter.get('/isFollowing/:userId/:idF',isFollowing)