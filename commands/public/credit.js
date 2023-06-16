const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('credit')
  .setDescription('how much robux you can buy.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you would like to calculate')                                                   
     .setRequired(true))) 
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  const val = parseInt(args[0]);

    if (!val) return message.reply("**❌ قم بوضع رقم!**");
    if (isNaN(val) || parseInt(val) !== val || val < 1) return message.reply("❌ **قم بوضع رقم صالح!**");
    
    const systemPrice = client.price;

    if (val * 0.95 < systemPrice * 1) return message.reply(`❌ **يجب أن يكون عدد الكريديت \`${Math.ceil((systemPrice * 1) / 0.95)}\` على الأقل!**`);

    const amount = Math.floor((val * 0.95) / systemPrice);
    const price = amount * systemPrice;
    const withtax = Math.ceil(price / 0.95);

    return message.reply({
      embeds: [
        new EmbedBuilder()
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`**ضريبة الكريديت**`)
        .addFields([{ name: 'يمكنك شراء :', value: `${amount} روبكس` }])
        .addFields([{ name: 'السعر :', value: `${price}` }])
        .addFields([{ name:'السعر مع الضريبة :', value: `${withtax}` }])
        .setTimestamp()
      ]
    }).catch(() => {});
}
