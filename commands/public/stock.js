const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('stock')
  .setDescription('Check the stock of robux.')
  
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  try {
    const Guilds = controller.getData('guilds');
    const roblox = controller.getData('roblox');
  
    const Guild = await Guilds.get(controller.guild.id);
    const Group = await roblox.groups.get(Guild.groupId);  
    const robux = await Group.getFunds().then(e => e.robux);
    const pending = await Group.getRevenueSummary().then(e => e.pendingRobux);
    const embed = new EmbedBuilder().setColor('#0be881').setTitle(Group.name).setDescription(`**- Total Robux : (\`${robux}\`)\n- Pending Robux : (\`${pending}\`)**`);  
  
    return {
      message: embed,
      interaction: embed
    };
  } catch {
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ embeds: [global] });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ embeds: [global] });
};