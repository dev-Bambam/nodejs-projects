import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./src/config/db.config.js";
import app from "./src/app";

dbConnect();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listening at: ${port}`);
});