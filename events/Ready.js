const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')

module.exports = new EventBuilder()
.setEvent(Events.ClientReady)
.setExecution(Execute)

function Execute(client) {
  console.log(`Client ${client.user.tag} Is Ready`)
}