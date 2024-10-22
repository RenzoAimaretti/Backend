import { Router } from "express";
import {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
} from "./admin.controller.js";
//import { verifyToken } from "../shared/session/verifyToken.js";
export const adminRouter = Router();

adminRouter.get("/", findAll);

adminRouter.get("/:id", findOne);

adminRouter.post("/", addOne);

adminRouter.put("/:id", updateOne);

adminRouter.delete("/:id", deleteOne);
