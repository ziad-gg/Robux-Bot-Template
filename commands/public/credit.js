const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('credit')
  .setDescription('how much robux you can buy.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you would like to calculate')                                                   
     .setRequired(true))) 
  .setGlobal(GlobalExecute)
  .setAliases([{ cut: 'c', prefix: true }])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const amount = parseInt(controller[0]);
  
  if (!amount) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
    
  const guildsData = controller.getData('guilds');
  const guildData = await guildsData.get(controller.guild.id);
  const guildPrice = guildData.price;

  if (amount * 0.95 < guildPrice * 1) return controller.replyNoMention({ content: `❌ **يجب أن يكون عدد الكريديت \`${Math.ceil((guildPrice * 1) / 0.95)}\` على الأقل!**` });

  const buy = Math.floor((amount * 0.95) / guildPrice);
  const price = buy * guildPrice;
  const withtax = Math.ceil(price / 0.95);

  return controller.replyNoMention({
    embeds: [
      new EmbedBuilder()
      .setColor('#0be881')
      .setThumbnail(controller.guild.iconURL())
      .setTitle(`**ضريبة الكريديت**`)
      .addFields([{ name: 'يمكنك شراء :', value: `${buy} روبكس` }])
      .addFields([{ name: 'السعر :', value: `${price}` }])
      .addFields([{ name:'السعر مع الضريبة :', value: `${withtax}` }])
      .setTimestamp()
    ]
  })
}
