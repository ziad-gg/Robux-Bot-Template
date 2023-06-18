const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('player')
  .setDescription('Get roblox player information.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('username')
     .setDescription('The username to get information for')                                                            
     .setRequired(true)))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  try {
    const roblox = message ? message.getData('roblox') : interaction.getData('roblox');
    const username = controller[0];
  
    if (!username) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد اسم المستخدم!**' });
    let user = await roblox.users.find({ userNames: username });
  
    if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' });
    user = await roblox.users.get(user.id);

    console.log(user);
    const embed = new EmbedBuilder()
      .setTitle('Roblox Player Information')
      .setImage(user.avatarURL())
      .addFields([{ name: 'Username', value: `**[${user.name}](${user})**` }])
      .addFields([{ name: 'Display Name', value: `${user.displayName}` }])
      .addFields([{ name: 'About me', value: `${user.description}` || 'None' }]) 
      .addFields([{ name: 'Created At', value: `<t:${Math.floor(+new Date(user.created) / 1000)}:F> (<t:${Math.floor(+new Date(user.created) / 1000)}:R>)` }]) 
      .addFields([{ name: 'Last Online', value: `<t:${Math.floor(+new Date(user.presence.lastOnline) / 1000)}:F> (<t:${Math.floor(+new Date(user.presence.lastOnline) / 1000)}:R>)` }]) 
      .addFields([{ name: 'Status', value: `${user.presence}` }]) 
      .addFields([{ name: 'Groups', value: `${user.groups.map(g => g.group).length}` }]) 
      .addFields([{ name: 'Friends Number', value: `${user.count}` }]) 
      .addFields([{ name: 'Followers', value: `${user.count}` }]) 
      .addFields([{ name: 'Following', value: `${user.count}` }]) 
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
    
    controller.replyNoMention({ embeds: [embed] });
  } catch {
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
}