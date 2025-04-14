import express from "express";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use("/portfolio/v1/user", userRoute);

app.all("*", (req, res, next) => {
   //    return res.status(404).json({
   //       status: "fail",
   //       message: `can't find ${req.originalUrl} on this server`,
   //    });

   const err = new Error(`can't find ${req.originalUrl} on this server`);
    err.status = "fail";
    err.statusCode = 404

    next(err)
});

// global error handling
app.use((error, req, res, next) => {
   error.statusCode = error.statusCode || 500;
   error.status = error.status || "error";
   res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
   });
});

export default app;
