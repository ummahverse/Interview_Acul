import express, { type Express, Response, Request, NextFunction } from "express";
import api from "./api/api";
import * as fs from 'fs';
import * as YAML from 'yaml';
import * as path from 'path'
import * as swaggerUI from 'swagger-ui-express'
import morgan from 'morgan';

require('dotenv').config();

const PORT = process.env.PORT as string
const ENV = process.env.PORT as string

const filePath: string = `${__dirname}/api-docs.yaml`;
const fileContent: string = fs.readFileSync(filePath, 'utf-8');
const parsedContent = YAML.parse(fileContent);

const swaggerDocument = YAML.parse(parsedContent);


const app : Express = express()

if (ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
})
app.use("/style.css", express.static(path.join(__dirname, "./style.css")))
app.use(
  "/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    customCssUrl: "/style.css",
  })
)

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