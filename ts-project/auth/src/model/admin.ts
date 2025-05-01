import { Schema, model, Document } from "mongoose";

export interface IAdminDocument extends Document {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   verified: boolean;
   code: string | undefined;
   codeValidation: number | undefined;
   refreshToken: string | undefined;
}

const adminSchema = new Schema<IAdminDocument>(
   {
      firstName: {
         type: String,
         trim: true,
         required: true,
      },
      lastName: {
         type: String,
         trim: true,
         required: true,
      },
      email: {
         type: String,
         trim: true,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
         trim: true,
      },
      verified: {
         type: Boolean,
         default: false,
         select: false,
      },
      code: {
         type: String, // Code for both email verification and password reset
         select: false,
      },
      codeValidation: {
         type: Number, // Expiry timestamp for the code
         select: false,
      },
      refreshToken: {
         type: String,
         select: false,
      },
   },
   { timestamps: true }
);

const Admin = model<IAdminDocument>("Admin", adminSchema);

export default Admin;
