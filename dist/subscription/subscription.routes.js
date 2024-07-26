import { Router } from "express";
import { findAll, findOne, deleteOne, addOne, updateOne } from "./subscription.controler.js"; //sanitizeUserInput
export const subscriptionRouter = Router();
subscriptionRouter.get('/', findAll);
subscriptionRouter.get('/:id', findOne);
subscriptionRouter.post('/', addOne);
subscriptionRouter.put('/:id', updateOne);
subscriptionRouter.delete('/:id', deleteOne);
//# sourceMappingURL=subscription.routes.js.map