import { Router } from "express";
import { sanitizeUserInput, findAll, findOne, deleteOne, addOne, updateOne } from "./list.controler.js";

export const listRouter=Router();

listRouter.get('/',findAll);

listRouter.get('/:id/:name_list',findOne);

listRouter.post('/',sanitizeUserInput,addOne);

listRouter.put('/:id/:name_list',sanitizeUserInput,updateOne);

listRouter.patch('/:id/:name_list',sanitizeUserInput,updateOne);

listRouter.delete('/:id/:name_list',deleteOne);