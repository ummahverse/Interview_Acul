import Joi from "joi";

export const userRegister = Joi.object({
    username: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(6).max(120).required(),
});

export const userLogin = Joi.object({
    username: Joi.string().max(50).optional(),
    email: Joi.string().email().max(50).optional(),
    password: Joi.string().min(6).max(120).required(),
});