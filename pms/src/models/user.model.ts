import {Schema, Document, model} from "mongoose";

interface IUser extends Document{
   fullname: string,
   username: string,
   email: string,
   password: string,
   bio?: string,
   coverStory?: string,
   techStack?: string[],
   skills?: string[],
   
}
const userSchema = new Schema<IUser>({
   fullname: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      select:false
   },
   bio: {
      type: String,
   },
   coverStory: { type: String },
   skills: { type: [String] },
   techStack: { type: [String] },
});

const User = model("User", userSchema);

export default User;


