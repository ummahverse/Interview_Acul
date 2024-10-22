import express, { type Request, Response } from 'express'
import { createPost } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const postRoute = express.Router()
    .post("/", verifyToken, createPost)

export default postRoute