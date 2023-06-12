const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('max')
  .setDescription('Select the max Amount to buy.')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option.setName('amount').setDescription('Amount Option to select').setRequired(true)))
  .setInteractionExecution(InteractionExecute)
  .isSubCommand()

async function InteractionExecute(interaction, global) {
  const guild = global.guild;
  const amount = interaction[0];
  
  if (interaction.GroupName === 'transfer') {
    guild.transfer.max = amount;  
    
    await guild.save();
    interaction.replyNoMention({ content: `> **Done ${interaction.GroupName} ${interaction.GroupChildName } is now ${amount}**` })
  } else if (interaction.GroupName === 'buy') {
    guild.buy.max = amount;  
    
    await guild.save();
    interaction.replyNoMention({ content: `> **Done ${interaction.GroupName} ${interaction.GroupChildName } is now ${amount}**` })
  };
};