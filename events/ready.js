const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')

module.exports = new EventBuilder()
.setEvent(Events.ClientReady)
.setExecution(Execute)

async function Execute(client) {
  console.log(`${client.user.tag} Is Online !`);
}