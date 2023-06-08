const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("balance")
  .setDescription("Shows user balance.")
  .setCategory("public")
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().addUserOption(option => option.setName('user').setDescription('User To Get Information of His Currency')))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Users = controller.getData('users');
  
  const args = controller[0];
  let user = controller.author;

  if (args) user = await controller.getUser(args.toId());
  if (!user) return controller.replyNoMention({ content: "> 🤔 **لا يمكنني العثور علي هذا العضو**" });
  if (user.bot) return controller.replyNoMention({ content: "> 🤔 **البوتات لا تملك حساب**" });
  
  const userData = await Users.get(user.id);
  const msg = user.id === controller.author.id ? `**رصيد حسابك هو \`${userData.balance}\`** 🪙` : `**رصيد ${user.username} هو \`${userData.balance}\`** 🪙`;

  return {
    message: msg,
    interaction: msg
  };
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ content: global });
};
