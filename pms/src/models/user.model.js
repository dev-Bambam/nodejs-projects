import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: [true, "please provide username or username taken"],
      unique: true,
   },
   email: {
      type: String,
      required: [true, "please provide a valid email"],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "please provide password"],
   },
   bio: {
      type: String,
   },
});

const User = mongoose.model("User", userSchema);

export default User;
