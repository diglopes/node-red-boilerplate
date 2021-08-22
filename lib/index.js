const { RED, server } = require("./server")

const PORT = process.env.PORT || 1880
server.listen(PORT)
RED.start()