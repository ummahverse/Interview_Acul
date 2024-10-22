import express, { type Request, Response } from 'express'
import { createPost } from '../controllers/post.controller';

const postRoute = express.Router()
    .post("/", createPost)

export default postRoute