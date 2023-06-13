const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('set')
  .setDescription('Management the database.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .OwnersOnly()
  .setSubcommands([
     { command: 'prefix' },     
     // { command: 'delete' },
     { command: 'group' },
     { command: 'clientsrole' },
     { command: 'donechannel' },
     { command: 'max', group: 'buy' },
     { command: 'min', group: 'buy' },
     { command: 'max', group: 'transfer' },
     { command: 'min', group: 'transfer' },
  ])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Guilds = controller.getData('guilds');
  const guild = await Guilds.get(controller.guild.id);
  
   return {
    interaction: { guild },
    message: { guild },
  }
}