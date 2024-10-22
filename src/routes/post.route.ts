import express, { type Request, Response } from 'express'
import { createPost, getPostById, getPosts } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const postRoute = express.Router()
    .post("/", verifyToken, createPost)
    .get("/:id", verifyToken, getPostById)
    .get("/", verifyToken, getPosts)

export default postRoute