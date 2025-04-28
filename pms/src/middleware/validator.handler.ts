import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationError } from "utils/Error/Custom.error";

export const payloadValidator = (schema: Joi.Schema) => {
   return async (req: Request, _res: Response, next: NextFunction) => {
      const { error } = await schema.validateAsync(req.body, { abortEarly: false });
      error
         ? next(
              new ValidationError(
                 error.details.map(
                    (err: Joi.ValidationErrorItem) => `${err.context?.key}:${err.message}`
                 )
              )
           )
         : next();
   };
};
