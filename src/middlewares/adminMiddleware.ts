import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.access_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'defaultSecret');
        
        
        if (decoded && (decoded as any).isAdmin) {
            
            next();
        } else {
           
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
