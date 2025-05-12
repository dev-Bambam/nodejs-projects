import { Document } from "mongoose";

interface iUser extends Document {
   id: number;
   name: string;
   email: string;
   password: string;
}
export default iUser;
