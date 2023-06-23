const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, roleMention } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('settings')
  .setDescription('Displays system information.')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);

  const embed = new EmbedBuilder()
    .setColor('#0be881')
    .setTitle('System Information')
    .addFields([{ name: 'Group', value: `\`\`\`${guildData.group || 'None'}\`\`\`` }])
    .addFields([{ name: 'Robux Price', value: `\`\`\`${guildData.price || 'None'}\`\`\`` }])
    .addFields([{ name: 'Boost Discount', value: `\`\`\`${guildData.discount || 'None'}%\`\`\`` }])
    .addFields([{ name: 'Minimum', value: `\`\`\`buy: ${guildData.buy.min || 'None'}, transfer: ${guildData.transfer.min}\`\`\`` }])
    .addFields([{ name: 'Maximum', value: `\`\`\`buy: ${guildData.buy.max || 'None'}, transfer: ${guildData.transfer.min}\`\`\`` }])
    .addFields([{ name: 'Thx Channel', value: `<#${guildData.thxChannel || 'None'}>` }])
    .addFields([{ name: 'Done Channel', value: `<#${guildData.proofsChannel || 'None'}>` }])
    .addFields([{ name: 'Recipient', value: `<@${guildData.recipient || 'None'}>`}])
    .addFields([{ name: 'Boost Role', value: `<@&${guildData.boostsRole || 'None'}>` }])
    .addFields([{ name: 'Clients Role', value:`<@&${guildData.clientsRole || 'None'}>` }])
    .addFields([{ name: 'Status', value: `\`\`\`buy: ${guildData.buy.status ? 'on' : 'off' || 'None'}, transfer: ${guildData.transfer.status ? 'on' : 'off' || 'None'}\`\`\`` }])
   
  return controller.replyNoMention({
    embeds: [embed]
  });
}