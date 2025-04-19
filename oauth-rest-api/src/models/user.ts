import { Schema, model, Document } from "mongoose";

interface User extends Document{
    email: string;
    googleId?: string;
    displayName?: string;
    authProvider: "google";
    createdAt: Date;
}

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    authProvider: {
        type: String,
        enum: ["google"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<User>("User", userSchema)