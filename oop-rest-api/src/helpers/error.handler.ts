import { Request, Response, NextFunction } from "express";

class ErrorHandler{
    static NotFound(req: Request, res: Response, next: NextFunction) {
        res.status(400).json({message: 'Resource not found'})
    }
    static serverError(
        error:Error,
        req: Request,
        res: Response,
        next:NextFunction
    ) {
        res.status(500).json({message: error.message})
    }
}

export default ErrorHandler