import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/db.js";
import app from "./src/app.js";

dbConnect();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listening at: ${port}`);
});