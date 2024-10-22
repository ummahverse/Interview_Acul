import express, { type Express, Response, Request, NextFunction } from "express";
import api from "./api/api";
import * as fs from 'fs';
import * as YAML from 'yaml';
import * as path from 'path'
import * as swaggerUI from 'swagger-ui-express'
import morgan from 'morgan';
import { ErrorWithStatusCode, handleError } from "./errors/error";

require('dotenv').config();

const PORT = process.env.PORT as string
const ENV = process.env.env as string

const filePath: string = path.join(__dirname, 'api-docs.yaml'); 

let swaggerDocument;

try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    swaggerDocument = YAML.parse(fileContent);
} catch (error) {
    process.exit(1);
}


const app  = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if( ENV === "development"){
  app.use(morgan("dev"))
}
app.use("/style.css", express.static(path.join(__dirname, "./style.css")))
app.use(
  "/api/v1/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    customCssUrl: "/style.css",
  })
)

app.use("/api/v1", api)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res)
})


  //404
app.use((req : Request, res : Response, next : NextFunction) => {
    res.status(404).json({
      status: false,
      message: `are you lost? ${req.method} ${req.url} is not registered!`,
      data: null,
    });
})


app.listen( PORT ,() => {
    console.log(`server is listening on port ${PORT}`)
})

export default app