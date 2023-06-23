const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = new CommandBuilder() 
  .setName('timer')
  .setDescription('Show time of end 14 days in group.')
  .setUsage(['{cmdname} (UserName)'])
  .setExample(['{cmdname} {rusername}'])
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('username')
     .setDescription('The name you want to find for the 14-day entry date')                                                            
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setAttr('args', 1)


async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  try {
    const requestsData = controller.getData('requests');
    const guildsData = controller.getData('guilds');
    const roblox = controller.getDate('roblox');
    
    let user = await roblox.users.find({ userIds: controller[0] });
    if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' });
    
    user = await roblox.users.get(user.id);
    const guildData = await guildData.get(controller.guild.id);
    const requestData = await requestsData.findOne({ groupId: guildData.group, userId: user.id });
    const isCompleted = !requestData ? true : Date.now() + 1209600000 <= requestData.joinDate ? true : false;
    if (isCompleted) return controller.replyNoMention({ content: '🥳 **هذا المستخدم لقد اكمل 14 يوم بالفعل في الجروب!**' });
    
    const unix = Math.floor(+new Date(Request.joinDate) / 1000 + 1209600);
    controller.replyNoMention({ content: `**${humanizeDuration(+new Date(Request.joinDate) + 1209600000 - Date.now(), { language: 'ar', round: true })} وتكمل اسبوعين في الجروب**`, new MessageEmbed().setColor('GREEN').setAuthor(User2.name , User2.avatarURL({type:'headshot'}) , `https://web.roblox.com/users/${User2.id}/profile`).setTitle(`ستكمل خلال:\n<t:${unix}:R>,<t:${unix}:F>\nدخلت الجروب منذ:\n<t:${unix2}:R>,<t:${unix2}:F>`).setFooter(message.author.tag , message.author.avatarURL({dynamic:true}))
    
    controller.replyNoMention({ embeds: [embed] });
  } catch {
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
}