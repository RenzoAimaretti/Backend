import { Router } from "express";
import {
  findAll,
  findOne,
  deleteOne,
  addOne,
  updateOne,
  searchRangoCinefilo,
} from "./rangoCinefilo.controller.js";

export const rangoRouter = Router();

rangoRouter.get("/search", searchRangoCinefilo);

rangoRouter.get("/", findAll);

rangoRouter.get("/:id", findOne);

rangoRouter.post("/", addOne);

rangoRouter.put("/:id", updateOne);

rangoRouter.delete("/:id", deleteOne);
