const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')

module.exports = new EventBuilder()
  .setEvent(Events.MessageCreate)
  .setExecution(Execute)

async function Execute(message) {
  const app = message.client.Application;
//   const guildsData = app.getData('guilds');
//   const guildData = await guildsData.get(message.guild.id);
//   const prefix = guildData.prefix;
  
//   app.setPrefix(prefix);
  
  if (message.content === '<@' + message.client.user.id + '>') return message.reply({ content: `My prefix is : ${app.prefix}` });
}