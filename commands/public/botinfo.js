const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('botinfo')
  .setDescription('Shows a information for bot.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .setAliases([{ cut: 'about', prefix: true }])
  
async function GlobalExecute(message, interaction) {
}