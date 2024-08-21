import { Router } from "express";
import { verifyToken } from "./session/verifyToken.js";
import { findOneDashboard } from "../user/user.controler.js";
export const dashboardRouter = Router();
dashboardRouter.get('/', verifyToken, async (req, res) => {
    try {
        // Usa el controlador de usuarios para buscar al usuario por su ID
        const user = await findOneDashboard(req, res);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        // Envía los datos del usuario al frontend
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).send({ message: 'There was a problem retrieving the user data.' });
    }
});
//# sourceMappingURL=dashboard.routes.js.map