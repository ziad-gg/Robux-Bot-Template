const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('give')
.setDescription('Give user an amount of robux.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder().addUserOption(op => op.setName('user').setDescription('User Acount to give Robux').setRequired(true)).addNumberOption(option => option.setName('amount').setDescription('Amount to Transfer To').setRequired(true)))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const Users = controller.getData('users');
  
  const UserId = controller[0];
  const Amount = controller[1];
  
  const User = await controller.getUser()

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

