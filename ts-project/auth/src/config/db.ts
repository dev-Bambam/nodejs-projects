import mongoose from "mongoose";
export const dBconnection = async () => {
   const connectionString: string | undefined = process.env.MONGO_URI;
   if (!connectionString) {
      throw new Error("MONGO_URI is not defined in the .env");
   }
   try {
      await mongoose.connect(connectionString);
      console.log("database connected successfully");
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`error occured: ${error.message}`);
      } else {
          throw new Error(`unexpedcted error occured: ${error}`)
      }
   }
};
