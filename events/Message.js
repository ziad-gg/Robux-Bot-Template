const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')

module.exports = new EventBuilder()
.setEvent(Events.MessageCreate)
.setExecution(Execute)

async function Execute(message) {
  
  const App = message.client.Application
  const Guilds = App.getData('guilds');
  const Guild = await Guilds.get(message.guild.id);
  const prefix = Guild.prefix;
  
  App.setPrefix(prefix)
  
  if (message.content === '<@' + message.client.user.id + '>') return message.reply({ content: `My prefix is : ${App.prefix}` });
   
}