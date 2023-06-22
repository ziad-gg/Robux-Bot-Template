const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('redeemcode')
  .setDescription('To redeem a gift code.')
  .setUsage(['{cmdname} robuxfactory'])
  .setExample(['{cmdname} robuxfactory'])
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName('code')
     .setDescription('The code you want to retrieve')
     .setRequired(true)))                                                    
  .setGlobal(GlobalExecute)
  .setAttr('args', 1) 
  .setAliases([{ cut: 'redeem', prefix: true }])

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const code = controller[0];
  const Gifts = controller.getData('codes');
  
  const Guild = controller.getData('guilds');
  const Users = controller.getData('users');
  const giftCode = await Gifts.findOne({ guildId: message.guild.id, code });
  
  const guildData = await Guild.get(controller.guild.id);
  const userData = await Users.get(controller.author.id);
      
  if (!giftCode) return controller.replyNoMention({ content: '❌ **هذا الكود غير صالح او منتهي الصلاحية!**' }); 
  if (giftCode.redeemedBy.includes(controller.author.id)) return controller.replyNoMention({ content: '❌ **لقد استعملت هذا الكود بالفعل!**' }); 
    
  giftCode.redeemedBy.push(controller.author.id);
  userData.balance += giftCode.prize;
  await giftCode.save();    
  await userData.save();

  controller.replyNoMention({ content: `✅ **تم بنجاح استعمال الرمز، وتم استلام ${.prize} رصيد\رصيدك الحالي هو ${userData.balance}**` });
  if (giftCode.max - giftCode.redeemedBy.length === 0) return Gifts.findOneAndRemove({ guildId: message.guild.id, code });
}