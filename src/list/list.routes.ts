import { Router } from "express";
import { sanitizeListInput, findAll, findOne, deleteOne, addOne, updateOne } from "./list.controler.js";

export const listRouter=Router();

listRouter.get('/',findAll);

listRouter.get('/:user_id/:name_list',findOne);

listRouter.post('/:user_id',sanitizeListInput,addOne);

listRouter.put('/:user_id/:name_list',sanitizeListInput,updateOne);

listRouter.patch('/:user_id/:name_list',sanitizeListInput,updateOne);

listRouter.delete('/:user_id/:name_list',deleteOne);