import { Router, Request, Response } from "express";
import { createPreference, webhook } from "./mp.controller.js";

export const mpRouter = Router();
mpRouter.post("/create_preference", createPreference);

mpRouter.post("/webhook", webhook);
