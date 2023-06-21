const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('set')
  .setDescription('Management the database.')
  .setUsage(['{cmdname} (CommandName) (GroupName)'])
  .setExample(['{cmdname} prefix ', '{cmdname} price', '{cmdname} group', '{cmdname} clientsrole', '{cmdname} proofschannel', '{cmdname} buy max', '{cmdname} buy min', '{cmdname} transfer max', '{cmdname} transfer min' ])
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .OwnersOnly()
  .setSubcommands([
     { command: 'prefix' },   
     { command: 'price' },   
     { command: 'group' },
     { command: 'clientsrole' },
     { command: 'proofschannel' },
     { command: 'max', group: 'buy' },
     { command: 'min', group: 'buy' },
     { command: 'max', group: 'transfer' },
     { command: 'min', group: 'transfer' },
  ])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;  
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);
  
  return guildData;
}