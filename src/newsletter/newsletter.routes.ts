import { Router } from "express";
import {
  addSuscriber,
  deleteSuscriber,
  getAllSuscribers,
  getOneSuscriber,
  updateSuscriber,
} from "./newsletter.controller.js";
import exp from "constants";

export const newsletterRouter = Router();

newsletterRouter.get("/", getAllSuscribers);

newsletterRouter.get("/:id", getOneSuscriber);

newsletterRouter.post("/", addSuscriber);

newsletterRouter.delete("/:id", deleteSuscriber);

newsletterRouter.put("/:id", updateSuscriber);
