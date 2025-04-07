import express from "express";
import authRouter from "./routes/authRoute";


const app = express()
app.use(express.json())

// endpoints
app.use('/user-auth', authRouter)

export default app;
