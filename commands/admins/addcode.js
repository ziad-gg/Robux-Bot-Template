const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('addcode')
  .setDescription('Create a gift code.')
  .setUsage(['{cmdname} (user) (amount)'])
  .setExample(['{cmdname} robuxfactory 100'])
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('code')
     .setDescription('The code you want')
     .setRequired(true)).addNumberOption((option) => option
        .setName('prize')
        .setDescription('The prize you want')
        .setRequired(true)).addNumberOption((option) => option                                   
          .setName('max')
          .setDescription('Maximum users')
          .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setAttr('args', 3)
  
async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  controller.replyNoMention('????');
};