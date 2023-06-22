const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('addcode')
  .setDescription('Create a gift code.')
  .setUsage(['{cmdname} (user) (amount)'])
  .setExample(['{cmdname} robuxfactory 100'])
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('code')
     .setDescription('The code you want')
     .setRequired(true)).addNumberOption((option) => option
        .setName('prize')
        .setDescription('The prize you want')
        .setRequired(true)).addNumberOption((option) => option                                   
          .setName('max')
          .setDescription('Maximum users')
          .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setAttr('args', 3)
  
async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const code = controller[0];
  const prize = +controller[1];
  const maxUsers = +controller[2];
  
  if (!prize.isNumber()) return message.channel.send('Prize must be a number');
  if (!maxUsers.isNumber()) return message.channel.send('Maxusers must be a number');    
    
  const gift = controller.getData('codes');
  const giftCode_ = await gift.findOne({ guildId: message.guild.id, code });
  const giftCode = await gift.findOrCreate({ guildId: message.guild.id, code });
    
  if (giftCode_) return message.channel.send('The code is already added');
  giftCode.max = maxUsers;
  giftCode.prize = prize;
  giftCode.createdBy = message.author.id;
  giftCode.redeemedBy = [];
  await giftCode.save();

  const embed = new EmbedBuilder()
  .setColor('#0be881')
  .setTitle('Robux Code Added')
  .setDescription(`Robux Code: ${code}`)
  .addFields([{ name: 'Max', value: `${maxUsers}` }])
  .addFields([{ name: 'Robux', value: `${prize}` }]) 
  .setTimestamp()
  .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
  
  controller.channel.send({ embeds: [embed] });
};