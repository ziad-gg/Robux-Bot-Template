const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');
const { DEFAULT_PREFIX } = require('../../src/Constants.js');

module.exports = new CommandBuilder() 
  .setName('prefix')
  .setDescription('Change Current Prefix To Another One')
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option 
     .setName('prefix')
     .setDescription('The New Prefix To Set')
     .setRequired(false)))
  .setInteractionExecution(InteractionExecute)
  .isSubCommand()

async function InteractionExecute(interaction, global) {
  const guild = global.guild;
  const prefix = interaction[0];
    
  if (!prefix) {
    guild.prefix = prefix;
    await guild.save();
  } else {
    guild.prefix = DEFAULT_PREFIX;
    await guild.save();
  };
   interaction.replyNoMention({ content: '✅' });
}