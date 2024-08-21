import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token)
        return res.status(401).send({ message: 'No token provided' });
    jwt.verify(token, 'clavesecreta-de-prueba-provisional-n$@#131238s91', (err, decoded) => {
        if (err)
            return res.status(401).send({ message: err.message, token: token });
        req.userId = decoded.id;
        console.log(decoded);
        next();
    });
}
//# sourceMappingURL=verifyToken.js.map