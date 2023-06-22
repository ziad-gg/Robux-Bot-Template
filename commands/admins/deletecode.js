const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('deletecode')
  .setDescription('To remove a specific code.')
  .setUsage(['{cmdname} robuxfactory'])
  .setExample(['{cmdname} robuxfactory'])
  .setGlobal(GlobalExecute)
  
async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
};