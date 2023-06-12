const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('end')
  .setDescription('Cancel your current purchase.')
  .setCategory('public')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const cooldowns = controller.getData('buy_cooldowns');
  const key = `${controller.author.id}-${controller.guild.id}`;
  
  if (!cooldowns.has(key)) return controller.replyNoMention({ content: '❌ **ليس لديك عملية شراء!**' });
  
  await cooldowns.delete(key);
  
  return {
    message: '✅ **تم بنجاح إنهاء عملية الشراء!**',
    interaction: '✅ **تم بنجاح إنهاء عملية الشراء!**',
  }
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {
  message.replyNoMention({ content: global });
};