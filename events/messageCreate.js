const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')
const { DEFAULT_GUILD } = require('../src/Constants.js');

module.exports = new EventBuilder()
  .setEvent(Events.MessageCreate)
  .setExecution(Execute)

async function Execute(message) {
  const app = message.client.Application;
  const guildsData = app.getData('guilds');
  const guildData = await guildsData.get(message.guild?.id || DEFAULT_GUILD);
  
  const prefix = guildData.prefix;
  app.setPrefix(prefix);
  
  if (message.content === '<@' + message.client.user.id + '>') return message.replyNoMention(`My prefix is : ${app.prefix}`);
  
  if (!message.content.includes(app.prefix)) return;
  const args = message.content.slice(app.prefix.length).split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd === 'set') {
    const command = app.getCommand('set');
    if (!command.owners.includes(message.author.id)) return;
    
    const SubCommands = command.SubCommands;
    const GroupName = args[0]?.toLowerCase();
    const GroupChildName = args[1]?.toLowerCase();
      
    let subs = SubCommands?.find(sub => sub.commandGroup?.toLowerCase() === GroupName && (GroupChildName ? sub.commandName === GroupChildName : true));
    if (!subs) subs = SubCommands.find(op => op.commandName.toLowerCase() === GroupName && !op.commandGroup);

    if (!subs) return message.replyNoMention('❌ **هذا الامر غير موجود!**');
  };
}