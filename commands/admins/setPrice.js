const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('price')
  .setDescription('Sets the robux price.')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option.setName('price').setDescription('Type Amount Here To Set').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .OwnersOnly()
  .isSubCommand()

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const guildsData = await global;  
  const guildData = await guildsData.get(controller.guild.id);
  const price = controller[0];
  
  if (!price.isNumber()) return controller.replyNoMention({ content: '❌ **قم بتحديد رقم صحيح!**' });
  
  Guild.price = price;
  await Guild.save();
  
  controller.replyNoMention({ content: '✅ **تم تحديد السعر بنجاح!**' });
}

function InteractionExecute(interaction, global) {};
function MessageExecute(message, global) {};