const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('price')
  .setDescription('Sets the robux price.')
  .setUsage(['{mainName} {cmdname} (price)'])
  .setExample(['{mainName} {cmdname} {lnumber}'])
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('price')
     .setDescription('The price of the robux you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .OwnersOnly()
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;  
  const price = +controller[0];
  
  if (!controller[0]) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد السعر!**' });
  if (!price.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد سعر صحيح!**' });
  if (price === guildData.price) return controller.replyNoMention({ content: '❌ **هذا السعر محدد من قبل!**' });
  
  guildData.price = price;
  await guildData.save();
  
  controller.replyNoMention({ content: '✅ **تم تحديد السعر بنجاح!**' });
};