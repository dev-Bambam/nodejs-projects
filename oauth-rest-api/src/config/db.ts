import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI!);
        console.log('database connected successfully')
    } catch (error:any) {
        console.error(error.message)
    }
}

export default connectDb