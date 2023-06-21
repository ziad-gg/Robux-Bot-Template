const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('groupinfo')
  .setDescription('Displays information about the group.')
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
      .setAuthor({ name: group.name, iconURL: group.logoURL() })
      .setTitle(group.name)
      .setURL(group.linkURL())
      .setThumbnail(group.logoURL())
      .addFields([{ name: '🆔 Group ID', value: `${group.id}` }])
      .addFields([{ name: '📅 Created On', value: `<t:${Math.floor(+new Date(group.shout.created) / 1000)}:R>` }])
      .addFields([{ name: '👥 Total Members', value: `${group.memberCount}` }])
      .addFields([{ name: '🤴 Group Owner', value: `${group.owner.username} (${group.owner.userId})` }])
      .addFields([{ name: '🕒 Pending Robux', value: `${await group.fetchRevenueSummary().then((e) => e.pendingRobux)}` }])
      .addFields([{ name: '💎 Total Robux', value: `${await group.fetchCurrency().then((e) => e.robux)}` }])
      .addFields([{ name: '🔺 Cashed Out', value: `${await group.fetchRevenueSummary().then((e) => e.groupPayoutRobux.toString().replace('-', ''))}` }]);
    controller.replyNoMention({ embeds: [embed] });
  } catch {
    controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  }
};