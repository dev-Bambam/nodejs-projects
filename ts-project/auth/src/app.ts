import express from 'express'
import authRouter from "./routes/authRoute";
import postRouter from "./routes/postRoutes";
import globalErrorHandler from './middleware/globalErrorHandling';
const app = express();
app.use(express.json());

// endpoints
app.use("/user-auth", authRouter);
app.use("/post", postRouter);

// Error handling Middleware
app.use(globalErrorHandler);

export default app;
