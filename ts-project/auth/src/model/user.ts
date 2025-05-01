import { Schema, model, Document, ObjectId } from "mongoose";

// create interface
export interface IUserDocument extends Document {
   _id: ObjectId;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   type: string;
   code: string | undefined;
   codeValidation: number | undefined;
   verified: boolean;
   refreshToken: string | undefined;
}

const userSchema = new Schema<IUserDocument>(
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
      type: {
         type: String,
         select: false
      },
      code: {
         type: String, // Code for both email verification and password reset
         select: false,
      },
      codeValidation: {
         type: Number, // Expiry timestamp for the code
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

const User = model<IUserDocument>("User", userSchema);

export default User;
