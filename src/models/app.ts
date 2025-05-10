import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
dotenv.config()

import { pingRouter } from '@/routes/ping.router'
import { corsOptions } from "@/config/cors.config"
import { mailerRouter } from "@/routes/mailer.router"
import { validateToken } from "@/middlewares/tokenManager.middleware"

export class App {
    // initializers
    private app: Application
    private port = 3000
    private apiVersion = "v1"
    private apiPaths = {
        ping: `/api/${this.apiVersion}/ping`,
        mailer: `/api/${this.apiVersion}/mailer`
    }

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    // middlewares
    private middlewares() {
        // json parser
        this.app.use(express.json()) // json parser
        this.app.use(cors(corsOptions)) // using cors
        this.app.use(validateToken)
        this.app.use(morgan(process.env.TS_NODE_DEV ? "dev" : "prod"))
    }

    // routes invocation
    private routes() {
        this.app.use(this.apiPaths.ping, pingRouter)
        this.app.use(this.apiPaths.mailer, mailerRouter)
    }

    // start server
    public start() {
        this.app.listen(this.port, () => {
            console.log("App online in port:", this.port)
        })
    }
}
