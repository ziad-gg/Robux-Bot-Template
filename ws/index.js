const WebSocket = require('ws');
const { CLIENT_OPTIONS } = require('../src/Constants.js');

module.exports = {
  connect: function () {
    const websocket = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    websocket.on("open", () => {
      websocket.send({
        token: process.env.TOKEN,
        properties: {
          $os: "linux",
          $browser: "chrome",
          $device: "chrome",
        },
        ...CLIENT_OPTIONS,
      });
    });
  },
};