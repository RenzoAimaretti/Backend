import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./list.controler.js";
export const listRouter = Router();
listRouter.get('/', findAll);
listRouter.get('/:id', findOne);
listRouter.post('/', addOne);
listRouter.put('/:userId/:nameList', updateOne);
listRouter.patch('/:userId/:nameList', updateOne);
listRouter.delete('/:id', deleteOne);
//# sourceMappingURL=list.routes.js.map