const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('skin')
  .setDescription('Get your roblox skin.')
  //.setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('username')
     .setDescription('The username to get skin for')                                                            
     .setRequired(true)))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  while (true) {
  const controller = message ?? interaction;
  try {
    const roblox = message ? message.getData('roblox') : interaction.getData('roblox');
    const username = controller[0];
  
    if (!username) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد اسم المستخدم!**' });
    let user = await roblox.users.find({ userNames: username });
  
    if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' });
    user = await roblox.users.get(user.id);

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.name, iconURL: user.avatarURL() })
      .setTitle(user.name)
      .setURL(user.profileURL())
      .setImage(user.avatarURL())
      .setFooter({ text: controller.author.username, iconURL: controller.author.avatarURL() })
      .setTimestamp();
  
    controller.replyNoMention({ embeds: [embed] });
  } catch {
    return controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
  };
  }
}