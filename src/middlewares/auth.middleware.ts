import { type Response, Request, NextFunction } from "express";

import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        message: 'Invalid token !',
        data: null
      });
    }
  
    const token = authorization.split(' ')[1];
  
    jwt.verify(token, SECRET_KEY, { algorithms: ['HS512'] }, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ 
          status: false,
          message: 'Unauthorized !',
          data: null 
        });
      }
  
      req.token = token;
      req.user = decoded; 
      next();
    });
  };
  