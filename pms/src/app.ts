import express from "express";
import userRoute from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use("/portfolio/v1/user", userRoute);

export default app;
