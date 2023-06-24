const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, userMention  } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('add') // في امر اسمه كدا فعلا نعمله مع ال admins add ?
  .setDescription('to.')//
  .setUsage(['{cmdname} (user)'])
  .setExample(['{cmdname} {userMention}', '{cmdname} {userId}'])
  .InteractionOn(new SlashCommandBuilder().addUserOption((option) => option
     .setName('admin')
     .setDescription('Admin Profile to Add')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {

}

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};