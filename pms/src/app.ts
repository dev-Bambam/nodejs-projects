import express from "express";
import userRoute from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use("/portfolio/v1/user", userRoute);

app.all("*", (req, res, next) => {
   //    return res.status(404).json({
   //       status: "fail",
   //       message: `can't find ${req.originalUrl} on this server`,
   //    });

   const err = new Error(`can't find ${req.originalUrl} on this server`);
   //  err.status = "fail";
   //  err.statusCode = 404

   next(err);
});

// global error handling
app.use();

export default app;
