import express, { Request, Response, Express } from "express";

const app: Express = express();

// Middleware
app.use(express.json());


// Basic route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'OAuth tutorial by tutor Grok'
    })
})

// export app

export default app
