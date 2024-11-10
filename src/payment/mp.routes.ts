import { Router, Request, Response } from "express";
import { createPreference } from "./mp.controller.js";

export const mpRouter = Router();
mpRouter.post("/create_preference", createPreference);
