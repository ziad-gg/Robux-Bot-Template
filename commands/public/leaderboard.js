const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('leaderboard')
  .setDescription('Shows top users.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const usersData = await controller.getData('users').find();
  
  controller.replyNoMention({ content: `🪙 **عدد رصيد الكل هو \`${usersData.reduce((a, b) => a + b.balance, 0)}\`**` });
};