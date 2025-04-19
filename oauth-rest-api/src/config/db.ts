import mongoose from "mongoose";

const connectDb = async () => {
    const connection = process.env.MONGO_DB_URI
    try {
        if(!connection) throw new Error('connection not configured')
        await mongoose.connect(connection)
        console.log('database connected successfully')
    } catch (error:any) {
        console.error(error.message)
    }
}