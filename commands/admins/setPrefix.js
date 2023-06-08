const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("setprefix")
  .setDescription("Change Current Prefix To Another One")
  .setCategory("admins")
  .InteractionOn(new SlashCommandBuilder().addStringOption(op ))
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

function InteractionExecute(interaction) {
  interaction.reply({ content: "PONG 🏓" });
}

function MessageExecute(message) {
  message.reply({ content: "PONG 🏓" });
};