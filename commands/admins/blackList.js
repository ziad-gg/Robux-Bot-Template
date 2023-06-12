const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('blacklist')
  .setDescription('To blacklist user.')
  .InteractionOn(new SlashCommandBuilder().addUserOption(option => option.setName('user').setDescription('User To blacklist').setRequired(true)).addStringOption(option => option.setName('duration').setDescription('Blacklist expiration time').setRequired(false)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  
  let user = controller[0] ?? controller['user'];
  if (!user) controller.replyNoMention({ content: '❌ **قم بتحديد المستخدم!**' });

  user = await controller.getUser(user.id);
  if (!user) controller.replyNoMention({ content: '❌ **قم بتحديد مستخدم صحيح!**' });
  
  const usersData = controller.getData('users');
  const userData = await usersData.get(user.id);
  
  console.log(user);
  return {
    message: "**✅ تم تحديد الجروب بنجاح!**",
    interaction: "**✅ تم تحديد الجروب بنجاح!**",
  }
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ content: global });
};

