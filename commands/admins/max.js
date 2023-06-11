const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('max')
.setDescription('Select the max Amount to buy.')
.InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('amount').setDescription('Channel Option to select').setRequired(true)))
.setInteractionExecution(InteractionExecute)
.isSubCommand()

async function InteractionExecute(interaction, global) {
  const guild = global.guild;
  const ChannelId = interaction[0];
  const Channel = interaction.guild.channels.cache.get(ChannelId);

  guild.proof = Channel.id;
  await guild.save();
  
  interaction.replyNoMention({ content: `تم تحديد <#${guild.proof}> روم الاثباتات` })
};