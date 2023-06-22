const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('blacklist')
  .setDescription('To blacklist user.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addUserOption(option => option.setName('user').setDescription('User To blacklist').setRequired(true)).addStringOption(option => option.setName('duration').setDescription('Blacklist expiration time').setRequired(false)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  // .OwnersOnly()

async function GlobalExecute(message, interaction) { 
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ content: global });
};

