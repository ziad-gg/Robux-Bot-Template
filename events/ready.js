const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js');
// const { PORT } = require('../src/Constants.js');
// const express = require('express');
// const app = express();

module.exports = new EventBuilder()
  .setEvent(Events.ClientReady)
  .setExecution(Execute)

async function Execute(client) {
  const num = 1e6
  console.log(num.formateNum())
  console.log(`${client.user.username} Is Online !`);
  require('../site/index.js');
  // app.listen(PORT);
}