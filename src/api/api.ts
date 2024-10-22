import { Router } from "express";
import authRoute from '../routes/auth.route';
import postRoute from "../routes/post.route";

const api = Router()
    .use("/auth", authRoute)
    .use("/post", postRoute)
export default api