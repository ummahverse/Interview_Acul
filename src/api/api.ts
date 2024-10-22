import { Router } from "express";
import authRoute from '../routes/auth.route';

const api = Router()
    .use("/auth", authRoute)
export default api