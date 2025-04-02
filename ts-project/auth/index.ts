import dotenv from 'dotenv'
dotenv.config();
import { dBconnection } from './src/config/db';
dBconnection();
import app from './src/app';

const port: string | undefined = process.env.PORT;

app.listen(port, () => {
    console.log(`app listening at port:${port}`)
})