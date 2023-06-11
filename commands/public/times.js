const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('times')
  .setDescription('Shows the pending robux times.')
  .setCategory('public')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  try {
    const guildsData = controller.getData('guilds');
    const roblox = controller.getData('roblox');
    const guildData = await guildsData.get(controller.guild.id);
    
    const group = await roblox.groups.get(guildData.groupId);  
    const transactions = await group.getTransactions();
    const embed = new EmbedBuilder()
      .setColor()
      .setTitle(group.name)
      .setThumbnail(message.guild.iconURL({ dynamic: true })) 
      .setDescription(transactions.filter(e => e.isPending).sort((a, b) => Math.floor((new Date(a.created).getTime() + 432e6) / 1000) - Math.floor((new Date(b.created).getTime() + 432e6) / 1000)).map(e => `**- Amount : ${Math.ceil(e.currency.amount)}\n- Arrival time : <t:${Math.floor((new Date(e.created).getTime() + 432e6) / 1000)}:F> \n<t:${Math.floor((new Date(e.created).getTime() + 432e6) / 1000)}:R>**`).join('\n\n') || ' ')
      .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
    
    return {
      message: embed,
      interaction: embed
    };
  } catch (e) {
    console.log(e);
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ embeds: [global] });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ embeds: [global] });
};