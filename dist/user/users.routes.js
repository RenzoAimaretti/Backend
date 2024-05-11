import { Router } from "express";
import { sanitizeUserInput, findAll, findOne, deleteOne, addOne, updateOne } from "./user.controler.js";
export const userRouter = Router();
userRouter.get('/', findAll);
userRouter.get('/:id', findOne);
userRouter.post('/', sanitizeUserInput, addOne);
userRouter.put('/:id', sanitizeUserInput, updateOne);
userRouter.patch('/:id', sanitizeUserInput, updateOne);
userRouter.delete('/:id', deleteOne);
//# sourceMappingURL=users.routes.js.map