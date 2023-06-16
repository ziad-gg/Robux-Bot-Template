const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('donechannel')
  .setDescription('set proof channel.')
  .InteractionOn(new SlashCommandBuilder().addChannelOption((option) => option
     .addChannelTypes(0)                                                       
     .setName('channel')
     .setDescription('Channel Option to select')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guild = await global;
  const ChannelId = interaction[0];
  const Channel = interaction.guild.channels.cache.get(ChannelId);
  
  if (!Channel) return controller.replyNoMention('❌ ****');
  if (Channel.type !== 'GUILD_TEXT') return controller.replyNoMention('❌ ****');
  
  guild.proof = Channel.id;
  await guild.save();
  
  controller.replyNoMention({ content: `✅ ****` });
};