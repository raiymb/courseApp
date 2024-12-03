import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isPublished: Joi.boolean().optional(),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  isPublished: Joi.boolean().optional(),
});
