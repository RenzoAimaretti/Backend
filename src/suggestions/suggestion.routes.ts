import { Router } from "express";
import {
  findAll,
  findOne,
  updateOne,
  deleteOne,
  addOne,
} from "./suggestion.controller.js";

export const suggestionRouter = Router();

suggestionRouter.get("/", findAll);

suggestionRouter.get("/:id", findOne);

suggestionRouter.post("/", addOne);

suggestionRouter.delete("/:id", deleteOne);

suggestionRouter.put("/:id", updateOne);
