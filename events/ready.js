const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js');
const uptime = new (require('uptimer-web').Ugijr
const express = require('express');
const app = express();

module.exports = new EventBuilder()
  .setEvent(Events.ClientReady)
  .setExecution(Execute)

async function Execute(client) {
  app.listen(3000);
  app.get('/', (req, res) => res.status(200).send('OK'));
  console.log(`${client.user.tag} Is Online !`);
}