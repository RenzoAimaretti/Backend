import { Router } from "express";
import {
  findAll,
  findOne,
  deleteOne,
  addOne,
  updateOne,
  searchSubscription,
} from "./subscription.controller.js"; //sanitizeUserInput

export const subscriptionRouter = Router();

subscriptionRouter.get("/search", searchSubscription);

subscriptionRouter.get("/", findAll);

subscriptionRouter.get("/:id", findOne);

subscriptionRouter.post("/", addOne);

subscriptionRouter.put("/:id", updateOne);

subscriptionRouter.delete("/:id", deleteOne);
