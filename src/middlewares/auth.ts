// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

interface JwtPayload {
  userId: string;
  name?: string;
  email?: string;
  iat?: number;
  exp?: number;
}


export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload ;
   
    req.userId = decoded.userId; // inyectamos el userId al body
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};
