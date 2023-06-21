const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('total')
  .setDescription("To see everyone's balance.")
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const usersData = await controller.getData('users').find();
  
  controller.replyNoMention({ content: `🪙 **عدد رصيد الكل هو \`${usersData.reduce((a, b) => a + b.balance, 0)}\`**` });
};