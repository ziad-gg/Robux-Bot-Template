const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("buy")
  .setDescription("Buy Some Roblox to UR Balance.")
  .setCategory("public")
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('amount').setDescription('Type Amount You Want To Buy Here').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;

  return {
    message: null, 
    interaction: null
  };
}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {
};