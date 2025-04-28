import express from "express";
import userRoute from "./routes/auth.route";
import errorHandler from "middleware/error.handler";

const app = express();
app.use(express.json());
app.use("/portfolio/v1/user", userRoute);

// global error handler 
app.use(errorHandler)
export default app;
