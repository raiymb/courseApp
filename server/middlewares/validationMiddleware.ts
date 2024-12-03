import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Validation Middleware
export const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }

    next();
  };
};
