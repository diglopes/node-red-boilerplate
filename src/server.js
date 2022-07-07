const envPath = process.env.NODE_ENV === "production" ? ".env" : ".env.dev"
require("dotenv").config({
    path: envPath
})

const path = require("path")
process.env.NODE_RED_HOME = path.join(__dirname, "..")

const http = require("http")
const express = require("express")
const RED = require("node-red")
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("../config/swagger")
const settings = require("../config/settings")

const app = express()

if (settings.swagger.enabled) {
    app.use("/docs", (req, res, next) => {
        swaggerDocument.host = req.get("host")
        req.swaggerDoc = swaggerDocument
        next()
    }, swaggerUI.serve, swaggerUI.setup())
}

const server = http.createServer(app)
RED.init(server, settings)
app.use(settings.httpAdminRoot, RED.httpAdmin)
app.use(settings.httpNodeRoot, RED.httpNode)

module.exports = { RED, server }