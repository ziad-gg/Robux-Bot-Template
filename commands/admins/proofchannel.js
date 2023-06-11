const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('give')
.setDescription('Give user an amount of robux.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder().addUserOption(op => op.setName('user').setDescription('User Acount to give Robux').setRequired(true)))
.setInteractionExecution(InteractionExecute)
.isSubCommand()

function InteractionExecute(interaction, global) {
  
}
