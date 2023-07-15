const WebSocket = require('ws');
const { CLIENT_OPTIONS } = require('../src/Constants.js');

module.exports = {
  connect: function () {
    const websocket = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    websocket.on('message', function message(data) {
      console.log('received: %s', data);
    });
    websocket.on('error', console.error);
    websocket.on('open', () => {
      websocket.send(JSON.stringify({
        token: process.env.TOKENn,
        properties: {
          $os: 'linux',
          $browser: 'chrome',
          $device: 'chrome',
        },
        ...CLIENT_OPTIONS, 
      }));
    });
  },
};