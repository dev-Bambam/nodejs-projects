import mongoose from "mongoose";

type myType = string | undefined;
export interface IUser {
   getId(): mongoose.Types.ObjectId;
   getEmail(): string;
   getType(): string;
   getPassword(): myType;
   getCode(): myType;
   getCodeValidation(): number | undefined;
   getRefreshToken(): myType;
   isVerified(): boolean;
   save(): Promise<void>;
   setVerificationCode(code: string): void;
   setRefreshToken(token: string): void;
   setPassword(password: string): Promise<void>;
   clearVerificationCode(): void;
}
