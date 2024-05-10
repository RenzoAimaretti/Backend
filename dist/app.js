import express from "express";
/*function sanitizeUsuarioInput(req: Request , res: Response , next:NextFunction) {
    Req.body.sanitizedInput = {
       nombre: req.body.nombre,
       contraseña: req.body.contraseña,
       amigos: req.body.amigos,
       listas: req.body.listas,
       }
   next()} */
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000/');
});
app.use((_, res) => {
    res.status(404).send('Not Found');
});
//# sourceMappingURL=app.js.map