const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('trade')
  .setDescription('Transfer your balance to someone else.')
  .setUsage(['{cmdname}', '{cmdname} (User)'])
  .setExample(['{cmdname}', '{cmdname} {userMention}', '{cmdname} {userId}'])
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(true).addUserOption((option) => option
     .setName('user')
     .setDescription('The user you want to transfer to')
     .setRequired(true)).addNumberOption((option) => option
        .setName('amount')
        .setDescription('The amount you want')                                                          
        .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setAttr('args', 1) 

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const amount = controller[1];
  const usersData = controller.getData('users');
  const userData = await usersData.get(controller.author.id);
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);
  const user = await controller.getUser(controller[0].toId());
  
  if (!user) return controller.replyNoMention({ content: '❌ **هذا المستخدم غير صالح!**' });
  if (user.bot) return controller.replyNoMention({ content: '❌ **لا يمكن التحويل للبوتات!**' });
  if (user.id = controller.author.id) return controller.replyNoMention({ content: '❌ **لا يمكن التحويل لنفسك!**' });
  
  if (userData.balance < amount) return controller.replyNoMention({ content: '❌ **ليس لديك رصيد كافي!**' });
  if (guildData.transfer.min > amount) return controller.replyNoMention({ content: `❌ **عذرا ولاكن الحد الأدنى للتحويل هو ${guildData.transfer.min}**` });
  if (guildData.transfer.max > 0 && guildData.transfer.max < amount) return controller.replyNoMention({ content: `❌ **عذرا ولاكن الحد الأقصى للتحويل هو ${guildData.transfer.max}**` });
  

};