const red = require("node-red");

module.exports = function(RED) {
    const { driver } = require('@rocket.chat/sdk');
    let botId

    function RocketChatReceiverNode(config) {
        RED.nodes.createNode(this, config);
        const node = this

        node.status({ fill: "yellow", shape: "dot", text: "connecting" })
        const { instanceHost, hasSSL, botUsername, credentials: { botPassword } } = RED.nodes.getNode(config.bot)
        driver.connect({
            host: instanceHost,
            useSsl: hasSSL
        })
        .then(() => {
            node.status({ fill: "green", shape: "dot", text: "connected" })
            return driver.login({ username: botUsername, password: botPassword });
        })
        .then(id => botId = id)
        .then(() => driver.subscribeToMessages())
        .then(() => {
            driver.reactToMessages(sendMessagesOnFlow.bind(node))
        })
        .catch(err => {
            node.status({ fill: "red", shape: "ring", text: "disconnected" })
        })
    }

    async function sendMessagesOnFlow (err, message, messageOptions) {
        if (!err) {
            const { _id: senderId } = message
            if (senderId === botId) return;
            const flowMessage = createFlowMessageFromRocketchatMessage(message)
            this.send(flowMessage)
        }
    }

    function createFlowMessageFromRocketchatMessage(message) {
        const { rid, u: { name, username }, msg, _id } = message
        const sender = {
            name,
            username
        }
        const topic = {
            roomId: rid,
            messageId: _id
        }

        return {
            topic,
            sender,
            payload: msg
        }
    }

    RED.nodes.registerType("rocketchatReceiver", RocketChatReceiverNode);
}