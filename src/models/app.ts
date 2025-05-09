import express, { Application } from "express"
import cors from "cors"

import { pingRouter } from '@/routes/ping.router'
import { corsOptions } from "@/config/cors.config"

export class App {
    // initializers
    private app: Application
    private port = 3000
    private apiVersion = "v1"
    private apiPaths = {
        ping: `/api/${this.apiVersion}/ping`
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
    }

    // routes invocation
    private routes() {
        this.app.use(this.apiPaths.ping, pingRouter)
    }

    // start server
    public start() {
        this.app.listen(this.port, () => {
            console.log("App online in port:", this.port)
        })
    }
}
