const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("stock")
  .setDescription("Shows the group stock of Robux.")
  .setCategory("public")
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Guilds = controller.getData('guilds');
  const roblox = controller.getData('roblox');
  
  const Guild =await Guilds.get(controller.guild.id);
  
  const Group = await roblox.groups.get(Guild.groupId);
  if (!Group) return controller.replyNoMention({ content: '❌ **يبدو أن معرف الجروب المدخل غير صحيح!**' });
  
  const robux = await Group.getFunds().then(e => e.robux);
  const pending = await Group.getRevenueSummary({ timeFrame: 'month' }).then(e => e.pendingRobux);
  
  const embed = new EmbedBuilder().setCologreer(ack').setTitle((controller.author.id === user.id) ? `رصيدك الحالي هو ${data.balance}` : `رصيد ${user.tag} الحالي هو ${data.balance}`);
   
  return {
    message: embed,
    interaction: embed
  };
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ embeds: [global] });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ embeds: [global] });
};
