const envPath = process.env.NODE_ENV === "prodiction" ? ".env" : ".env.dev"
require("dotenv").config( {
    path: envPath
})
const http = require("http")
const express = require("express")
const RED = require("node-red")
const settings = require("../config/settings")

const app = express()

process.env.NODE_RED_HOME = __dirname;

const server = http.createServer(app)

RED.init(server, settings)

app.use(settings.httpAdminRoot, RED.httpAdmin)
app.use(settings.httpNodeRoot, RED.httpNode)

module.exports = {
    RED,
    server
}