const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('avatar')
  .setDescription('Get your roblox avatar.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption(option => option
     .setName('username')
     .setDescription('The username to get avatar for')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const roblox = message ? message.getData('roblox') : interaction.getData('roblox');
  const controller = message ?? interaction;
  const username = controller[0];
  
  if (!username) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد اسم المستخدم!**' });
  let user = await roblox.users.find({ userNames: username });
  
  if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' });
  user = await roblox.users.get(user.id);

  const embed = new EmbedBuilder()
  .setAuthor({ name: user.name, iconURL: user.avatarURL({ type: 'Headshot' }) })
  .setTitle(user.name)
  .setURL(user.profileURL())
  .setImage(user.avatarURL({ type: 'Headshot' }))
  .setFooter({ text: controller.author.username, iconURL: controller.author.avatarURL() })
  .setTimestamp();
  
  return embed;
}

async function InteractionExecute(interaction, Global) {
  const embed = await Global;
  interaction.replyNoMention({ embeds: [embed] });
};

async function MessageExecute(message, Global) { 
  const embed = await Global;
  message.replyNoMention({ embeds: [global] });
};

