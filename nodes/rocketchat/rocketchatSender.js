const red = require("node-red");

module.exports = function(RED) {
    const { driver } = require('@rocket.chat/sdk');

    function RocketChatSenderNode(config) {
        RED.nodes.createNode(this, config);
        const node = this

        node.on("input", msg => {
            const { payload, topic: { roomId } } = msg
            driver.sendToRoomId(payload, roomId)
        })
    }

    RED.nodes.registerType("rocketchatSender", RocketChatSenderNode);
}