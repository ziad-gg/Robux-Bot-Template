const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('max')
  .setDescription('Select the max Amount to set.')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('amount')
     .setDescription('Amount Option to select')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guild = await global;
  const amount = controller[0];
  
  if (!amount) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد الحد الاعلي!**');
  if (!amount.isNumber()) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');
  
  if (controller.GroupName === 'transfer') {
    guild.transfer.max = amount;
    await guild.save();
    controller.replyNoMention({ content: `> **Done ${controller.GroupName} ${controller.GroupChildName } is now ${amount}**` })
  } else if (controller.GroupName === 'buy') {
    guild.buy.max = amount; 
    await guild.save();
    controller.replyNoMention({ content: `> **Done ${controller.GroupName} ${controller.GroupChildName } is now ${amount}**` })
  };
};