import prisma from "../libs/prisma.lib";

import { Request, Response } from 'express';
import { CreatePost, PostResponse } from '../types/post.type';
import { createPostSchema, idSchemaPost } from "../validation/post.validate";
import { UserAuth } from "../types/auth.type";

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { error } = createPostSchema.validate(req.body);
  
    if (error) {
      throw new ErrorWithStatusCode(error.details[0].message, 400);
    }
  
    const { caption, is_public, location } : CreatePost = req.body;
  
    try {
      const newPost = await prisma.post.create({
        data: {
          caption : caption,
          user_id : Number((req as unknown as UserAuth).user?.id),
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
  

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { error } = idSchemaPost.validate(req.params);

  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
      data: null,
    });
  }

  const { id } = req.params;

  try {
    
    const post = await prisma.post.findUnique({
      where: { id : Number(id) },
    });

    if (!post) {
        throw new ErrorWithStatusCode("Post not found", 404)
    };
    
    const postResponse: PostResponse = {
      id: post.id,
      caption: post.caption,
      user_id: post.user_id,
      is_public: post.is_public,
      location: post.location,
      created_at: post.created_at,
    };

    res.status(200).json({
      status: true,
      message: 'Post fetched successfully',
      data: postResponse,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'An error occurred while fetching the post',
      data: null,
    });
  }
};
