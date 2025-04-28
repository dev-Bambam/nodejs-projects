export class CustomError extends Error {
   constructor(
      message: string,
      public statusCode: number,
       public status: string,
      public type: string,
      public isOperational = true,
   ) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.status = status;
      this.type = type;
      Error.captureStackTrace(this, this.constructor);
   }
}

export class ValidationError extends CustomError{
    constructor(public details: string[]) {
        super('Validation failed', 400, "error", "VALIDATION_ERR");
        this.details = details
    }
}