import mongoose from "mongoose";
import iUser from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String, required:true}
},{timestamps:true})

const User = mongoose.model<iUser>("User", userSchema)
export default User