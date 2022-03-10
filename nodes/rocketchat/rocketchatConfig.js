module.exports = function(RED) {
    function RocketChatConfigNode(config) {
        RED.nodes.createNode(this, config);
        const node = this
        this.instanceHost = config.instanceHost
        this.botUsername = config.botUsername
        this.botName = config.botName
        this.hasSSL = config.hasSSL
    }

    RED.nodes.registerType("rocketchatConfig", RocketChatConfigNode, {
        credentials: {
            botPassword: {
                type: "password", 
                required: true
            }
        }
    });
}