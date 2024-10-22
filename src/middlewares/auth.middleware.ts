import { type Response, Request, NextFunction } from "express";

import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { UserAuth } from '../types/auth.type';
import { ErrorWithStatusCode } from "../errors/error";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new ErrorWithStatusCode("Invalid token !", 401)
    }
  
    const token = authorization.split(' ')[1];
  
    jwt.verify(token, SECRET_KEY, { algorithms: ['HS512'] }, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(401).json({ 
          status: false,
          message: 'Unauthorized !',
          data: null 
        });
      }
  
      (req as unknown as UserAuth).user = decoded as UserAuth['user'];
      next();
      next();
    });
  };
  