const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('setgroup')
.setDescription("Set Main Roblox Group.")
.setCategory("admins")
.InteractionOn(new SlashCommandBuilder().addNumberOption(option => option.setName('id').setDescription('Group Id To ')))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) { 
  const controller =  message ?? interaction;
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({embeds: [global]});
};

function MessageExecute(message, global) {   
  message.replyNoMention({embeds: [global]});
};

