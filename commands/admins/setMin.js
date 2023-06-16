const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('min')
  .setDescription('Sets the min.')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('min')
     .setDescription('The min do you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;
  const amount = parseInt(controller[0]);
  
  if (!amount) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد الحد الأدنى!**');
  if (!amount.isNumber()) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');
  
  if (controller.GroupName === 'transfer') {
    guildData.transfer.min = amount;
    await guildData.save();
    controller.replyNoMention({ content: '✅ **تم تحديد الحد الأدنى بنجاح!**' });
    
  } else if (controller.GroupName === 'buy') {
    guildData.buy.min = amount; 
    await guildData.save();
    controller.replyNoMention({ content: '✅ **تم تحديد الحد الأدنى بنجاح!**' });
  };
};