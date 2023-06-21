const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('smessage')
  .setDescription('Sets status channel.')
  .setUsage(['{mainName} {cmdname} (channel)'])
  .setExample(['{mainName} {cmdname} {channelMention}', '{mainName} {cmdname} {channelId}'])
  .InteractionOn(new SlashCommandBuilder().addChannelOption((option) => option
     .addChannelTypes(0)                                                       
     .setName('schannel')
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
  
  if (guildData.schannels.find(e => e.ChannelId === channel.id)) {
    const { MessageId } = guildData.schannels.find(e => e.ChannelId === channel.id);
    const msg = await channel.messages.cache.get(MessageId);
    if (msg) msg.delete();
    await guildData.updateOne({ id: controller.guild.id }, { $pull: { schannels: { ChannelId: channel.id } } } );
    return controller.replyNoMention({ content: '✅ **تم حذف هذه القناه بنجاح**' })
  } else {
    const msg = await channel.send({ content: '**Robux Withdrawal System : Closed**\n\**Robux Buy System : Closed**' });
    await guildData.updateOne({ id: controller.guild.id }, { $push: { schannels: { MessageId: msg.id, ChannelId: channel.id } } } );
    return controller.replyNoMention({ content: '✅ **تم اضافه هذه القناه بنجاح**' })
    
  } 
  
};

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};