const envPath = process.env.NODE_ENV === "prodiction" ? ".env" : ".env.dev"
require("dotenv").config( {
    path: envPath
})
const http = require("http")
const express = require("express")
const RED = require("node-red")
const swaggerUI = require("swagger-ui-express")
const settings = require("../config/settings")
const swaggerDocument = require("../config/swagger")

process.env.NODE_RED_HOME = __dirname;

const app = express()

app.use("/docs",(req, res, next) => {
    swaggerDocument.host = req.get("host")
    req.swaggerDoc = swaggerDocument
    next()
}, swaggerUI.serve, swaggerUI.setup())

const server = http.createServer(app)

RED.init(server, settings)

app.use(settings.httpAdminRoot, RED.httpAdmin)
app.use(settings.httpNodeRoot, RED.httpNode)

module.exports = {
    RED,
    server
}