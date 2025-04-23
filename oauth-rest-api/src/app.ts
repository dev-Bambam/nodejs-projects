import express, { Request, Response, Express } from "express";
import passport from "passport";
import authRoutes from './routes/authRoute'

const app: Express = express();

// Middleware
app.use(express.json());
app.use(passport.initialize())


// Basic route
app.use('/auth', authRoutes)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'OAuth tutorial by tutor Grok'
    })
})

// export app

export default app
