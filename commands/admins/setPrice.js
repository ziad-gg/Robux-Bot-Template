const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("setprice")
  .setDescription("Set Robux Price.")
  .setCategory("admins")
  .InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('price').setDescription('Type Amount Here To Set').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  
  const Guilds = controller.getData('guilds');  
  const Guild = await Guilds.get(controller.guild.id);

  const price = controller[0];
  
  if (isNaN(price) || price <= 0) return controller.replyNoMention({ content: "❌ **قم بتحديد سعر صحيح**" })
  
  Guild.price = price;
  await Guild.save();
  
  return {
    message: "✅ **تم تحديد السعر بنجاح**", 
    interaction: "✅ **تم تحديد السعر بنجاح**"
  };
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {
  message.InteractionExecute({ content: global });
};