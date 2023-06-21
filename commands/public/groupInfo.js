const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('groupinfo')
  .setDescription('Get a group information.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  try {
    const guildData = await controller.getData('guilds').get(controller.guild.id);
    const group = await controller.getData('roblox').groups.get(guildData.groupId);
    const embed = new EmbedBuilder()
     .setColor('#0be881')
    
    controller.replyNoMention({ embeds: [embed] });
  } catch {
    controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  }
};