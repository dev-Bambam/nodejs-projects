import dotenv from "dotenv";
dotenv.config()
import connectDb from "./src/config/db";
connectDb();
import './src/config/passport'; //initialize passport
import app from "./src/app";


const port = process.env.PORT!;

app.listen(port, () => {
    console.log(`app listening at port:${port}`)
});