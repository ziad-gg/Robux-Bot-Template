const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('recipient')
  .setDescription('Sets Recipient.')
  .setUsage(['{mainName} {cmdname} (user)'])
  .setExample(['{mainName} {cmdname} {userMention}', '{mainName} {cmdname} {userId}'])
  .InteractionOn(new SlashCommandBuilder().addUserOption((option) => option
     .setName('user')
     .setDescription('The Recipient you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;
  
  if (!controller[0]) return controller.replyNoMention({ content: '❌ **قم بتحديد متلقي الارباح اولا !**' });
  
  const Recipient = await controller.getUser(controller[0].toId()).then(user => user).catch(e => null);

  if (!Recipient || Recipient.user.bot) return controller.replyNoMention({ content: '❌ **قم بتحديد رتبة صالحة!**' });
  if (guildData.recipient === Recipient.user.id) return controller.replyNoMention({ content: '❌ **هذه الرتبة محددة من قبل!**' });
  
  guildData.recipient = Recipient.user.id;
  await guildData.save();
  
  controller.replyNoMention({ content: '✅ **تم بنجاح تحديد مستلم الارباح!**' });
};