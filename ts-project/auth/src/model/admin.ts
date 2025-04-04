import { Schema, model, Document } from "mongoose";

export interface AdminDocument extends Document {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   verified: boolean;
   passwordResetCode: string | undefined;
   passwordResetValidation: number | undefined;
   emailVerificationCode: string | undefined;
   emailCodeValidation: number | undefined;
   refreshToken: string | undefined;
}

const adminSchema = new Schema<AdminDocument>(
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
         unique: true
      },
      password: {
         type: String,
         required: true,
         select: false,
         trim: true
      },
      verified: {
         type: Boolean,
         default: false,
         select: false,
      },
      passwordResetCode: {
         type: String,
         select: false,
         default: null
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
      refreshToken: {
         type: String,
         select: false,
      },
   },
   { timestamps: true }
);

const Admin = model<AdminDocument>("Admin", adminSchema);

export default Admin
