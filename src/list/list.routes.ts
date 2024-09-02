import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne,searchLists, addContent } from "./list.controler.js";

export const listRouter=Router();
listRouter.get('/search', searchLists);

listRouter.get('/',findAll);

listRouter.get('/:id',findOne);

listRouter.post('/',addOne);

listRouter.put('/:userId/:nameList',updateOne);

listRouter.put('/:idContent/:idList/addContent',addContent);

listRouter.patch('/:userId/:nameList',updateOne);

listRouter.delete('/:id',deleteOne);

