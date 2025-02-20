import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { claveSecretaJwt } from "../../../config.js";

export function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  debugger;
  console.log(token);
  if (!token) return res.status(401).send({ message: "No token provided" });

  jwt.verify(token, claveSecretaJwt, (err: any, decoded: any) => {
    if (err)
      return res.status(401).send({ message: err.message, token: token });
    req.body.userId = decoded.id;
    console.log(decoded);
    next();
  });
}
