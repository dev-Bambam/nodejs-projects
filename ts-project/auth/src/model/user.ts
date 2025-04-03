import { Schema, model, Document } from "mongoose";

// create interface 
export interface User extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordResetCode: string | undefined,
    passwordResetValidation: number | undefined,
    emailVerificationCode: string | undefined,
    emailVerificationValidation: number | undefined,
    verified: boolean,
    refreshToken: string | undefined
}
const userSchema = new Schema<User>(
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
      emailVerificationValidation: {
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

// revokedToken schema in order to implement refresh token rotation

const revokedTokenSchema = new Schema({
   token: {
      type: String,
      required: true,
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   expiresAt: {
      type: Date,
      required: true,
   },
});

// indexing
revokedTokenSchema.index({ token: 1, studentId: 1 });
revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); //for automatic refreshToken deletion after it expires

export const User = model("User", userSchema);
export const RevokedToken = model("RevokedToken", revokedTokenSchema);
