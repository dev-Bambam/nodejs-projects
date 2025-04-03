import { Schema, model, Document } from "mongoose";

export interface Admin extends Document {
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

const adminSchema = new Schema<Admin>(
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
      },
      password: {
         type: String,
         required: true,
      },
      verified: {
         type: Boolean,
         default: false,
         select: false,
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
        refreshToken: {
            type: String,
            select: false
      }
   },
   { timestamps: true }
);

// revokedToken schema in order to implement refresh token rotation
const revokedTokenSchema = new Schema({
   token: { type: String, required: true }, // Hashed refresh token
   studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
   expiresAt: { type: Date, required: true }, // For cleanup
});
// indexing
revokedTokenSchema.index({ token: 1, studentId: 1 })
revokedTokenSchema.index(
   { expiresAt: 1 },
   {expireAfterSeconds: 0}
) //for automatic refreshToken deletion after it expires

