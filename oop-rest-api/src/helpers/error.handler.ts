import { Request, Response, NextFunction } from "express";

class ErrorHandler{
    static NotFound(_req: Request, res: Response, _next: NextFunction) {
        res.status(400).json({message: 'Resource not found'})
    }
    static serverError(
        error:Error,
        _req: Request,
        res: Response,
        _next:NextFunction
    ) {
        res.status(500).json({message: error.message})
    }
}

export default ErrorHandler