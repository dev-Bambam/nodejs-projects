import { Schema, model, Document } from "mongoose";

// create interface 
export interface UserDocument extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordResetCode: string | undefined,
    passwordResetValidation: number | undefined,
    emailVerificationCode: string | undefined,
    emailCodeValidation: number | undefined,
    verified: boolean,
    refreshToken: string | undefined
}

const userSchema = new Schema<UserDocument>(
   {
      firstName: {
         type: String,
         required: true,
         trim: true,
      },
      lastName: {
         type: String,
         require: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
         trim: true,
      },
      passwordResetCode: {
         type: String,
         select: false,
      },
      passwordResetValidation: {
         type: Number,
         select: false,
      },
      emailVerificationCode: {
         type: String,
         select: false,
      },
      emailCodeValidation: {
         type: Number,
         select: false,
      },
      verified: {
         type: Boolean,
         default: false,
         select: false,
      },
      refreshToken: {
         type: String,
         select: false,
      },
   },
   { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);

export default User;
