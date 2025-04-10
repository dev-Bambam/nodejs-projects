export class BaseError extends Error {
   // decalre properties
   public statusCode: number;
   public status: string;
   public isOperational: boolean;
   public type: string;

   // set up constructor
   constructor(message: string, statusCode: number, type:string, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.status = 'error';
      this.isOperational = isOperational;
      this.type = type
      Error.captureStackTrace(this, this.constructor);
   }
}

export class ValidationError extends BaseError {
   public details: string[];
   constructor(details:string[]) {
      super('Validation Failed', 400,'VALIDATION_ERR', true); // 400 Bad Request
      this.details = details
   }
}

export class NotFoundError extends BaseError {
   constructor(message: string) {
      super(message, 404,'NOT_FOUND_ERR', true); // 404 Not Found
   }
}
