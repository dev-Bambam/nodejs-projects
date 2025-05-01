import { BaseError, ValidationError } from "../utils/Errors/Errors";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const globalErrorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    // initialize all BaseError Properties
   const statusCode = err.statusCode ?? 500;
   const status = err.status ?? "fail";
   const type = err.type ?? "UNKOWN_ERR";
   const message = err.message ?? "Something is wrong";
   let errorDetails = {};

    // check for specific error like ValidationError to populate error details fields
   if (err instanceof ValidationError) {
      errorDetails = { details: err.details };
   }

   // Logging
   if (!err.isOperational) {
      logger.error(`Programmer Error: ${err.stack}`); // Full stack for bugs
   } else {
      logger.error(`Operational Error: ${message}`); // Minimal log for expected issues
   }

    // send response
   res.status(statusCode).json({
      status,
      type,
      message,
      ...errorDetails,
   });
};

export default globalErrorHandler;
