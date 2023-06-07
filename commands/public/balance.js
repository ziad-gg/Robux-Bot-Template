const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName("balance")
.setDescription("Get Your Current Currency")
.setCategory("public")
.InteractionOn(new SlashCommandBuilder().addUserOption(option => option.setName('user').setDescription('User To Get Information of His Currency')))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute (message, interaction) {
}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {   
};

