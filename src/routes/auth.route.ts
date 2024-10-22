import express, { type Request, Response } from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller';

const authRoute = express.Router()
    .post("/signup", registerUser)
    .post("/signin", loginUser);

export default authRoute