import { BaseError, ValidationError } from "../utils/Errors/Errors";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const globalErrorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'fail'
   const message = err.message || "Something is wrong";
   const type = err.type || "UNKOWN_ERR";
   let extraFileds = {};

   if (err instanceof ValidationError) {
      extraFileds = { details: err.details };
   }

   // Logging
   if (!err.isOperational) {
      logger.error(`Programmer Error: ${err.stack}`); // Full stack for bugs
   } else {
      logger.error(`Operational Error: ${message}`); // Minimal log for expected issues
   }

   res.status(statusCode).json({
      status,
      message,
      type,
      ...extraFileds,
   });
};

export default globalErrorHandler;