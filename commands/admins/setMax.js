const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('max')
  .setDescription('Sets the max.')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('max')
     .setDescription('The max do you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;
  const amount = +controller[0];
  
  if (!controller[0]) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد الحد الأقصى!**');
  if (!amount.isInteger()) return controller.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');
  
  if (controller.GroupName === 'transfer') {
    guildData.transfer.max = amount;
    await guildData.save();
    
    controller.replyNoMention({ content: '✅ **تم تحديد الحد الأقصى بنجاح!**' });
    
  } else if (controller.GroupName === 'buy') {
    guildData.buy.max = amount; 
    await guildData.save();
    
    controller.replyNoMention({ content: '✅ **تم تحديد الحد لأقصى بنجاح!**' });
  };
};