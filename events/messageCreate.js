const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')
const { DEFAULT_GUILD } = require('../src/Constants.js');

module.exports = new EventBuilder()
  .setEvent(Events.MessageCreate)
  .setExecution(Execute)

async function Execute(message) {
  if (message.author.bot) return;
  
  const app = message.client.Application;
  const guildsData = app.getData('guilds');
  const guildData = await guildsData.get(message.guild?.id || DEFAULT_GUILD);
  
  const prefix = guildData.prefix;
  app.setPrefix(prefix);
  
  const [EmojiName, EmojiId] = guildData.thxEmoji?.startsWith('<a') ? guildData.thxEmoji?.match(/<a:(.*?):(\d+)>/)?.slice(1) : guildData.thxEmoji?.match(/<:(.*?):(\d+)>/)?.slice(1);
  const thxEmoji = message.guild?.emojis?.cache.get(EmojiId) ?? '❤️';  
  
  if (message.channel.id === guildData.thxChannel) return message.react(thxEmoji);
  if (message.content === '<@' + message.client.user.id + '>') return message.replyNoMention(`My prefix is : ${app.prefix}`);
  if (!message.content.includes(app.prefix)) return;
  
  const args = message.content.slice(app.prefix.length).split(/ +/g);
  const commandName = args.shift().toLowerCase();
  
  if (commandName === 'restart') {
    if (!message.client.Application.owners.includes(message.author.id)) return;
    await message.replyNoMention('✅ **جاري إعادة تشغيل البوت!**');
    process.exit(1);
  }
  if (commandName === 'test') {
    const roblox = message.client.Application.getData('roblox');
    const { session } = roblox;
    
    
   const res = await session.post('https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate');
   console.log(res.headers);
  }
  if (commandName === 'set') {
    const command = app.getCommand('set');
    if (!command.owners.includes(message.author.id)) return;
    
    const SubCommands = command.SubCommands;
    const GroupName = args[0]?.toLowerCase();
    const GroupChildName = args[1]?.toLowerCase();
      
    let subs = SubCommands?.find(sub => sub.commandGroup?.toLowerCase() === GroupName && (GroupChildName ? sub.commandName === GroupChildName : true));
    if (!subs) subs = SubCommands.find(op => op.commandName.toLowerCase() === GroupName && !op.commandGroup);

    if (!subs) return message.replyNoMention('❌ **هذا الأمر غير موجود!**');
  };
}