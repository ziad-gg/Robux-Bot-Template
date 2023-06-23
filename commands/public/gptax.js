const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('gptax')
  .setDescription('GamePass tax calculation.')
  .setUsage(['{cmdname} (Amount)'])
  .setExample(['{cmdname} {snumber}'])
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you would like to calculate')                                                   
     .setRequired(true))) 
  .setGlobal(GlobalExecute)
  .setAttr('args', 1)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const amount = parseInt(controller[0]);
  
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
    
  const tax = Math.ceil(amount / 0.7);
  const transformation = Math.floor(amount * 0.7);
  
  return controller.replyNoMention({
    embeds: [
      new EmbedBuilder()
      .setColor('#0be881')
      .setThumbnail(controller.guild.iconURL())
      .setTitle(`**ضريبة الروبكس**`)
      .addFields([{ name: `**المبلغ بدون ضريبة :**`, value: '' + price }])
      .addFields([{ name: `**المبلغ بعد الضريبة :**`, value: '' + Math.ceil(price / 0.95) }])
      .setTimestamp()
     ]
  })
}
