import express, { Application } from 'express'
import cors from "cors"
import helmet from 'helmet'
import ErrorHandler from './helpers/error.handler'
import Database from './config/db.config'
import userRoute from './routes/user.route'

class App{
    private readonly app: Application
    private readonly port: number
    
    constructor() {
        this.app = express()
        this.port = parseInt(process.env.PORT || "3000")
        this.init()
    }
    private init() {
        this.initConfig()
        this.initMiddleWares()
        this.initRoutes()
        this.initErrorHandling()
    }
    private initConfig() {
        new Database()
    }
    private initMiddleWares() {
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }
    private initRoutes(){
        this.app.use('api/v1/users', userRoute)
    }
    private initErrorHandling() {
        this.app.use(ErrorHandler.NotFound);
        this.app.use(ErrorHandler.serverError);
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at localhost:${this.port}`)
        })
    }
}

export default App