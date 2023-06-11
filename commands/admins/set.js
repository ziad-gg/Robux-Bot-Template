const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('set')
.setDescription('This Command is To manage a multi tasks.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder())
.setGlobal(GlobalExecute)
.setSubcommands([
   { command: '' }
])

function GlobalExecute() {
  
}