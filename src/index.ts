import express, { type Express, Response, Request, NextFunction } from "express";
import api from "./api/api";

require('dotenv').config();

const PORT = process.env.PORT as string
const ENV = process.env.PORT as string

const app : Express = express()

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
})

app.use("/api/v1", api)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorWithStatusCode) {
        res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: null,
        });    
    } else {
        res.status(500).json({
            status: false,
            message: ENV === 'production' ? 'Internal Server Error' : err.message,
            data: null,
        });      
    }
});

  //404
app.use((req : Request, res : Response, next : NextFunction) => {
    res.status(404).json({
      status: false,
      message: `are you lost? ${req.method} ${req.url} is not registered!`,
      data: null,
    });
});


app.listen( PORT ,() => {
    console.log(`server is listening on port ${PORT}`)
})