const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = new CommandBuilder() 
  .setName("transfer")
  .setDescription("Change Your Current Balance to Robux.")
  .setCategory("public")
  .setCooldown('15s')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('amount').setDescription('Type Amount You Want To Buy Here').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  
  const Tickets = controller.getData('tickets');
  const Guilds = controller.getData('guilds');
  const Users = controller.getData('users');
  

}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {
};