const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('robux')
  .setDescription('Robux price calculation.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you would like to calculate')                                                   
     .setRequired(true))) 
  .setGlobal(GlobalExecute)
  .setAliases([{ cut: 'r', prefix: true }])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const amount = parseInt(controller[0]);
  
  if (!amount) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
    
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);
  const guildPrice = guildData.price;

  const price = Math.floor(amount * guildPrice);

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
