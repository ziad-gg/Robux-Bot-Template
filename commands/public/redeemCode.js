const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('redeemcode')
  .setDescription('To redeem a gift code.')
  .setUsage(['{cmdname} robuxfactory'])
  .setExample(['{cmdname} robuxfactory'])
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName('code')
     .setDescription('The code you want to retrieve')
     .setRequired(true)))                                                    
  .setGlobal(GlobalExecute)
  .setAttr('args', 1) 
  .setAliases([{ cut: 'redeem', prefix: true }])

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const code = controller[0];
};