import { Router } from "express";
import {
  register,
  login,
  logout,
  registerAdmin,
  loginAdmin,
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/register/admin", registerAdmin);

authRouter.post("/login/admin", loginAdmin);
