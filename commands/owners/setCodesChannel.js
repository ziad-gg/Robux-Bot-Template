const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('codeschannel')
  .setDescription('Sets codes channel.')
  .setUsage(['{mainName} {cmdname} (channel)'])
  .setExample(['{mainName} {cmdname} {channelMention}', '{mainName} {cmdname} {channelId}'])
  .InteractionOn(new SlashCommandBuilder().addChannelOption((option) => option
     .addChannelTypes(0)                                                       
     .setName('codchannel')
     .setDescription('The channel you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;
  const channelId = controller[0]?.toId();
  if (!channelId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد القناة!**' });
  
  const channel = controller.guild.channels.cache.get(channelId);
  
  if (!channel) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد قناة صالحة!**' });
  if (channel.type !== 0) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد قناة كتابية!**' });
  if (guildData.codesChannel === channel.id) return controller.replyNoMention({ content: '❌ **هذه القناة محددة من قبل!**' });	
  
  guildData.codesChannel = channel.id;
  await guildData.save();
  
  controller.replyNoMention({ content: '✅ **تم بنجاح تحديد قناة الأكواد!**' });
};

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};