const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('stock')
  .setDescription('Check the stock of robux.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  try {
    const guildsData = controller.getData('guilds');
    const roblox = controller.getData('roblox');
    const guildData = await guildsData.get(controller.guild.id);
    
    const group = await roblox.groups.get(guildData.groupId);  
    const robux = await group.fetchCurrency().then((e) => e.robux);
    const pending = await group.fetchRevenueSummary().then((e) => e.pendingRobux);
    const embed = new EmbedBuilder().setColor('#0be881').setTitle(group.name).setDescription(`**- Total Robux : (\`${robux}\`)\n- Pending Robux : (\`${pending}\`)**`);  
  
    controller.replyNoMention({ embeds: [embed] });

  } catch {
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
};