import { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
    email: string;
    password?: string;
    googleId?: string;
    displayName?: string;
    authProvider: "google" | 'local';
    createdAt: Date;
}
export interface IJwtPayload{
    id: string,
    email: string,
    authProvider: 'google' | 'local'
 }
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    authProvider: {
        type: String,
        enum: ["google", "local"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<IUser>("User", userSchema)