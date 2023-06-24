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
    const Guilds = controller.getData('guilds');
    const roblox = controller.getData('roblox');
    
    let user = await roblox.users.find({ userNames: controller[0] });
    if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' });
    
    user = await roblox.users.get(user.id);
    const guildData = await Guilds.get(controller.guild.id);
    const requestData = await requestsData.findOne({ groupId: guildData.group, userId: user.id });
    const isCompleted = !requestData ? true : Date.now() + 1209600000 <= requestData.joinDate ? true : false;
    
    if (!user.hasGroup(guildData.group)) return controller.replyNoMention({ content: '❌ **بيدو ان هذا العضو غير متواجد في الجروب!**' });
    if (isCompleted) return controller.replyNoMention({ content: '🥳 **هذا المستخدم لقد اكمل 14 يوم بالفعل في الجروب!**' });
    
    const unix = Math.floor(+new Date(requestData.joinDate) / 1000 + 1209600);
    const unix2 = Math.floor(+new Date(requestData.joinDate) / 1000);
    
    const embed = new EmbedBuilder()
      .setColor('#0be881')
      .setAuthor({ name: user.name , iconURL: user.avatarURL({ type: 'Headshot' }) })
      .setTitle(`ستكمل في:\n<t:${unix}:F>\nدخلت الجروب منذ:\n<t:${unix2}:F> (<t:${unix2}:R>)`)
      .setFooter({ text: controller.author.username, iconURL: controller.author.avatarURL() });
     
    const remaining = humanizeDuration(+new Date(requestData.joinDate) + 1209600000 - Date.now(), { language: 'ar', round: true });
                  
    controller.replyNoMention({ content: `**${remaining} لتكمل اسبوعين في الجروب**`, embeds: [embed] })
   
  } catch (e) {
    console.log(e);
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
};