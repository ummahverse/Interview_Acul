
import { JwtPayload } from "jsonwebtoken";


export interface UserAuth extends Request {
  user?: {
    id: string;
  };
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

