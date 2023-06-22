const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
  
  const guildData = await Guild.get(message.guild.id);
  const userData = await Users.get(message.author.id);
      
  if (!giftCode) return message.lineReplyNoMention({ embeds: [new EmbedBuilder().setColor('#f53b57').setDescription('**هذا الكود غير صالح او منتهي**')] }); 
  if (giftCode.redeemedBy.includes(controller.author.id)) return message.lineReplyNoMention({ embeds: [new EmbedBuilder().setColor('#f53b57').setDescription(replys.redeemcode.already)] }); 
    
  giftCode.redeemedBy.push(message.author.id);
  rData.balance += giftCode.prize;
    ait giftCode.save();    
    ait userData.save();
 
    msage.lineReplyNoMention({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(replys.redeemcode.robux_added(giftCode.prize, userData.balance))] });
    i(giftCode.max - giftCode.redeemedBy.length === 0) return client.db.codes.findOneAndRemove({ guildId: message.guild.id, code });
   