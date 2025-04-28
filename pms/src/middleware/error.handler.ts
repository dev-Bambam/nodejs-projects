import { CustomError, ValidationError } from "utils/Error/Custom.error";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
   const status = err.status ?? "fail";
   const statusCode = err.statusCode ?? 500;
   const type = err.type ?? "SERVER_ERR";
   const message = err.message;
   let meta = {};

   if (err instanceof ValidationError) {
      meta = { details: err.details };
   }
   res.status(statusCode).json({
      status,
      type,
      message,
      ...meta,
   });
};

export default errorHandler;
