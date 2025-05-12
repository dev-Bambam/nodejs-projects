import mongoose from "mongoose";

class Database {
   private readonly URI: string;

   constructor() {
      this.URI = process.env.MONGO_DB_URI!;
      this.connect();
   }
   private async connect() {
      try {
         await mongoose.connect(this.URI);
         console.log("DB connected");
      } catch (error) {
         console.error("Db connection fail");
      }
   }
}

export default Database;
