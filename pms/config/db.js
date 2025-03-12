import mongoose from "mongoose";

const dbConnect = async () => {
   try {
       await mongoose.connect(process.env.MONGO_DB_URI);
       console.log('database connected')
   } catch (error) {
       console.error(`error occured: ${error.message}`)
   }
};

export default dbConnect