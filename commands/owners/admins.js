const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('admins')
  .setDescription('Management Admins.')
  .setUsage(['{cmdname} (GroupName) (CommandName)'])
  .setExample(['{cmdname} add {userMention} ', '{cmdname} add {userId}' ])
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .OwnersOnly()
  .setSubcommands([
     { command: 'add' },
     { command: 'delete' },
     { command: 'list' },
  ]);

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;  
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);
  
  return guildData;
}