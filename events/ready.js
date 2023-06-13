const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js');
const uptime = new (require('uptimer-web').UptimeBuilder)({ TYPE: 'Array', URLS: [require('../src/Constants.js').PROJECT_LINK], TIMEOUT: 24e4 });
const express = require('express');
const app = express();

module.exports = new EventBuilder()
  .setEvent(Events.ClientReady)
  .setExecution(Execute)

async function Execute(client) {
  app.listen(3000);
  app.get('/', (req, res) => res.status(200).send('OK'));
  uptime.startAll();
  console.log(`${client.user.tag} Is Online !`);
}