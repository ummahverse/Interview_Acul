import Joi from "joi";

export const userRegister = Joi.object({
  username: Joi.string().max(50).required()
    .messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username is required.',
      'string.max': 'Username cannot be longer than 50 characters.',
      'any.required': 'Username is required.',
    }),

  email: Joi.string().email().max(50).required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email is required.',
      'string.max': 'Email cannot be longer than 50 characters.',
      'any.required': 'Email is required.',
    }),

  password: Joi.string().min(6).max(120).required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters long.',
      'string.max': 'Password cannot be longer than 120 characters.',
      'any.required': 'Password is required.',
    })
});


export const userLogin = Joi.object({
  username: Joi.string().max(50).optional()
    .messages({
      'string.base': 'Username must be a string.',
      'string.max': 'Username cannot be longer than 50 characters.',
    }),

  email: Joi.string().email().max(50).optional()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.',
      'string.max': 'Email cannot be longer than 50 characters.',
    }),
    password: Joi.string().min(6).max(120).required()
      .messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
        'string.max': 'Password cannot be longer than 120 characters.',
        'any.required': 'Password is required.',
      })
  });
