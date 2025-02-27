import express from "express";
import { userRouter } from "./user/users.routes.js";
import { listRouter } from "./list/list.routes.js";
import "reflect-metadata";
import { orm, syncSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
import { subscriptionRouter } from "./subscription/subscription.routes.js";
import { rangoRouter } from "./rangoCinefilo/rangoCinefilo.routes.js";
import { authRouter } from "./shared/session/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { dashboardRouter } from "./shared/dashboard.routes.js";
import { contentRouter } from "./showContent/content.routes.js";
import { suggestionRouter } from "./suggestions/suggestion.routes.js";
import { adminRouter } from "./admin/admin.routes.js";
import { initDb } from "./shared/db/initDb.js";
import { mpRouter } from "./payment/mp.routes.js";
import { claveSecretaJwt, port } from "../config.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const token = req.cookies.access_token;
  let data = null;
  req.session = { user: null } as any;
  try {
    //moverla a env
    data = jwt.verify(token, claveSecretaJwt);
  } catch (error) {
    req.session.user = null;
  }

  next();
});

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

//adicion del middleware orm despues de los base y antes de los de negocio y sus rutas
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

//Rutas
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);
app.use("/api/rangos", rangoRouter);
app.use("/api/subscription", subscriptionRouter); // /api/users/subscription?
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/review", contentRouter);
app.use("/api/suggestions", suggestionRouter);
app.use("/api/admin", adminRouter);
app.use("/api/mp/", mpRouter);

await syncSchema(); // solo en dev, NO SE DEBE USAR EN PRODUCCION
//inicializado de la bd
await initDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((_, res) => {
  res.status(404).send("Resource Not Found");
});
