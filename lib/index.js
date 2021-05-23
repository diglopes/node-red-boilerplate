const { RED, server } = require("./server")

server.listen(process.env.PORT)
RED.start()