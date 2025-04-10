import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationError } from "../utils/Errors/Errors";

export const reqValidation = (schema: Joi.ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next()
        } catch (error: any) {
            if (error.isJoi) {
                throw new ValidationError('Validation failed', error.details.map((err:any)=>err.message))
            }
            next(error)
        }
    }
}
