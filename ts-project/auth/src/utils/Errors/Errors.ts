export class BaseError extends Error {
   // decalre properties
   public statusCode: number;
   public status: string;
   public isOperational: boolean;
   public type: string;

   // set up constructor
   constructor(message: string, statusCode: number, type: string, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.status = "error";
      this.isOperational = isOperational;
      this.type = type;
      Error.captureStackTrace(this, this.constructor);
   }
}

export class ValidationError extends BaseError {
   public details: string[];
   constructor(details: string[]) {
      super("Validation Failed", 400, "VALIDATION_ERR", true); // 400 Bad Request
      this.details = details;
   }
}

export class NotFoundError extends BaseError {
   constructor() {
      super("User not found", 404, "NOT_FOUND_ERR", true); // 404 Not Found
   }
}

export class InvalidError extends BaseError {
   constructor() {
      super("Invalid type", 500, "SERVER_ERR", false);
   }
}
export class UserExistError extends BaseError {
   constructor() {
      super("User already exist", 400, "DUPLICATE_ENTRY_ERR", true);
   }
}

export class EmailError extends BaseError {
   public email: string;
   constructor(
      email: string,
      message: string = `Email was not accepted by the recipient's server: ${email}`
   ) {
      super(message, 500, "EMAIL_ERR", false);
      this.email = email;
   }
}
export class UserVerifiedError extends BaseError{
   constructor() {
      super('user already verified', 409, 'USER_ERR')
   }
}

export class InvalidCodeError extends BaseError {
   constructor() {
      super("Invalid or Expired code", 400, "INVALID_CODE_ERR");
   }
}

export class UserNotVerifiedError extends BaseError {
   constructor() {
      super("User not yet verified", 400, "USER_ERR");
   }
}

export class PasswordError extends BaseError {
   constructor() {
      super("password is incorrect", 400, "USER_ERR");
   }
}