const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js');
// const { PORT } = require('../src/Constants.js');
// const express = require('express');
// const app = express();

module.exports = new EventBuilder()
  .setEvent(Events.InteractionCreate)
  .setExecution(Execute)

async function Execute(i) {
 console.log(i.message);
  await i.reply({ content: "Hello" });
  console.log(i.message)
}