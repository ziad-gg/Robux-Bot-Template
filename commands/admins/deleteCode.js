const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('deletecode')
  .setDescription('To remove a specific code.')
  .setUsage(['{cmdname} robuxfactory'])
  .setExample(['{cmdname} robuxfactory'])
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName('code')
     .setDescription('The code you want to delete')
     .setRequired(true)))                                                    
  .setGlobal(GlobalExecute)
  .setAttr('args', 1) 
  
async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const code = controller[0];
  const giftsSchema = controller.getData('codes');
  const giftsData = await giftsSchema.find();
    
  if (!giftsData.map(e => e.code).includes(code)) return message.channel.send('❌ **هذا الكود غير مضاف!**');
  await giftsSchema.findOneAndRemove({ guildId: message.guild.id, code });
  message.channel.send('✅ **تم بنجاح حذف هذا الكود!**');
};