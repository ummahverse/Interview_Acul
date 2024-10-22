import prisma from "../libs/prisma.lib";

import { Request, Response } from 'express';
import { CreatePost, PostResponse } from '../types/post.type';
import { createPostSchema } from "../validation/post.validate";

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { error } = createPostSchema.validate(req.body);
  
    if (error) {
      throw new ErrorWithStatusCode(error.details[0].message, 400);
    }
  
    const { caption, user_id, is_public, location } : CreatePost = req.body;
  
    try {
      const newPost = await prisma.post.create({
        data: {
          caption,
          user_id,
          is_public: is_public ?? false,
          location: location ?? null,
          created_at: new Date(),
        },
      });
  
      const postResponse: PostResponse = {
        id: newPost.id,
        caption: newPost.caption,
        user_id: newPost.user_id,
        is_public: newPost.is_public,
        location: newPost.location,
        created_at: newPost.created_at,
      };
  
      res.status(201).json({
        status: true,
        message: 'Post created successfully',
        data: postResponse,
      });
  
    } catch (err) {
        throw err
    }
  };
  