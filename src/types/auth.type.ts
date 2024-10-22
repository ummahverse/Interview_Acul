
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload | string;
        token?: string;             
      }
    }
  }

export interface LoginResponse {
    status: boolean;
    message: string;
    data: {
        token: string;
    } | null;
}

export interface RegisterResponse {
    status: boolean;
    message: string;
    data: null
}

