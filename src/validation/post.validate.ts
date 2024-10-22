import Joi from 'joi';

// Schema for validating the creation of a new post
export const createPostSchema = Joi.object({
  caption: Joi.string().min(1).max(255).required()
    .messages({
      'string.base': 'Caption must be a string.',
      'string.empty': 'Caption cannot be empty.',
      'string.min': 'Caption must be at least 1 character long.',
      'string.max': 'Caption must be less than or equal to 255 characters.',
      'any.required': 'Caption is required.',
    }),
  
  user_id: Joi.number().integer().required()
    .messages({
      'number.base': 'User ID must be a number.',
      'number.integer': 'User ID must be an integer.',
      'any.required': 'User ID is required.',
    }),

  is_public: Joi.boolean().optional()
    .messages({
      'boolean.base': 'Is_public must be a boolean.',
    }),

  location: Joi.string().optional().allow(null).max(255)
    .messages({
      'string.base': 'Location must be a string.',
      'string.max': 'Location must be less than or equal to 255 characters.',
    })
});
