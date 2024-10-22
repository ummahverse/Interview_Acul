import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
const ENV = process.env.PORT as string

export class ErrorWithStatusCode extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message); 
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        
        Object.setPrototypeOf(this, ErrorWithStatusCode.prototype);
    }
}

export const handleError = async (err : unknown , res : Response) => {
   
    if (err instanceof ErrorWithStatusCode) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: null,
        });    
    } 

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            return res.status(409).json({
              status: false,
              message: `${err.meta?.target} already used`,
              data: null,
            });
    }}

    return res.status(500).json({
        status: false,
        message: ENV === 'production' ? 'Internal Server Error' : (err as Error).message,
        data: null,
    });      
    
};
