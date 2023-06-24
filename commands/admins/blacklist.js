const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('blacklist')
  .setDescription('To blacklist user.')
  .setUsage(['{cmdname}', '{cmdname} (User)'])
  .setExample(['{cmdname}', '{cmdname} {userMention}', '{cmdname} {userId}'])
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute) 
  // .setSubcommands([
  //    { command: 'add' },   
  //    { command: 'remove' },
  //    { command: 'list' },
  //    { command: 'remove', group: 'all' },
  // ])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction; 
  const GolbalCommands = ['add', 'remove'];  
  const usersData = controller.getData('users');
  const userData = (GolbalCommands.includes(controller.GroupChildName)) ? await usersData.get(controller[0]) : usersData;
  
  return userData;
};