import express from "express";
import { userRouter } from "./user/users.routes.js";
import { listRouter } from "./list/list.routes.js";
import 'reflect-metadata';
import { orm, syncSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
import { subscriptionRouter } from "./subscription/subscription.routes.js";
import { rangoRouter } from "./user/rangoCinefilo.routes.js";
const app = express();
app.use(express.json());
//adicion del middleware orm despues de los base y antes de los de negocio y sus rutas
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
//Rutas
app.use('/api/users', userRouter);
app.use('/api/lists', listRouter);
app.use('/api/rangos', rangoRouter);
app.use('/api/subscription', subscriptionRouter); // /api/users/subscription?
await syncSchema(); // solo en dev, NO SE DEBE USAR EN PRODUCCION
app.listen(3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000/');
});
app.use((_, res) => {
    res.status(404).send('Resource Not Found');
});
//# sourceMappingURL=app.js.map