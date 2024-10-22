import { Request, Response } from 'express';
import { PrismaClient, users } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { userLogin, userRegister } from '../validation/auth.validate';
import argon2 from 'argon2';
import { LoginResponse } from '../types/auth.type';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response):Promise<void> => {
  const { error } = userRegister.validate(req.body);
  
  if (error) {
    throw new ErrorWithStatusCode(error.details[0].message, 400)
  }

  const { username, email, password } = req.body;

  const hashedPassword = await argon2.hash(password);

  try {
    
    await prisma.users.create({
      data: {
        username : username,
        email : email,
        password : hashedPassword, 
        updated_at : new Date(), 
      },
    });

    res.status(201).json({
      status: true,
      message: 'User created successfully',
      data: null,
    });

  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            res.status(400).json({
              status: false,
              message: 'Username or email already exists',
              data: null,
            });

          default:
            res.status(500).json({
              status: false,
              message: 'An unexpected error occurred',
              data: null,
            });
        }
      }
  
      throw err;
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { error } = userLogin.validate(req.body);

  if (error) {
    throw new ErrorWithStatusCode(error.details[0].message, 400);
  }

  const { username, email, password } = req.body;

  if ((username && email) || (!username && !email)) {
    throw new ErrorWithStatusCode('Please provide either username or email, but not both.', 400);
  }

  try {
    const user: users | null = await prisma.users.findUnique({
      where: {
        username: username || undefined,
        email: email || undefined,
      },
    });

    if (!user) {
      throw new ErrorWithStatusCode("User is not found", 404);
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        message: 'Invalid password.',
        data: null,
      } as LoginResponse);
     ; 
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!, 
      { algorithm: 'HS512', expiresIn: '1h' } 
    );

    res.status(200).json({
      status: true,
      message: 'Login successful.',
      data: {
        token : token,
      },
    } as LoginResponse);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          res.status(500).json({
            status: false,
            message: 'An unexpected error occurred',
            data: null,
          });
      }
    }

    throw err;
  }
};