import { type Response, Request, NextFunction } from "express";

import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { UserAuth } from '../types/auth.type';
import { ErrorWithStatusCode, handleError } from "../errors/error";

const SECRET_KEY = process.env.JWT_SECRET as string


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith('Bearer ')) {

      res.status(401).json({
          status: false,
          message: 'Invalid token'
      });
  }

  const token = (authorization as string).split(' ')[1];

  jwt.verify(token, SECRET_KEY, { algorithms: ['HS512'] }, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {

      if (err) {
          return res.status(401).json({ 
              status: false,
              message: 'Unauthorized!',
              data: null 
          });
      }

      (req as unknown as UserAuth).user = decoded as UserAuth['user'];
      next(); // Call next to continue to the next middleware
  });
};
