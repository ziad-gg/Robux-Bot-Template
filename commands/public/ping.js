const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("ping")
  .setDescription("Test Bot By Ping it And Wait For Response")
  .setCategory("public")
  .InteractionOn(new SlashCommandBuilder())
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

function InteractionExecute(interaction) {
  interaction.reply({ content: "PONG 🏓" });
}

function MessageExecute(message) {
  message.reply({ content: "PONG 🏓" });
};