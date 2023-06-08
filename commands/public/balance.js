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
  
  const controller =  message ?? interaction;
  const Users = controller.getData('users');
  
  const args = controller[0];
  let user = controller.author;

  if (args) user = await controller.getUser(args.toId());
  if (!user) return controller.replyNoMention({ content: "> 🤔 **لا يمكنني العثور علي هذا العضو**" });
  if (user.bot) return controller.replyNoMention({ content: "> 🤔 **البوتات لا تملك حساب**" });
  
  const data = await Users.get(user.id);
  const embed = new EmbedBuilder().setColor('DarkButNotBlack').setTitle((controller.author.id === user.id) ? `رصيدك الحالي هو ${data.balance}` : `رصيد ${user.tag} الحالي هو ${data.balance}`);
   
  return {
    message: embed,
    interaction: embed
  };
  
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({embeds: [global]});
};

function MessageExecute(message, global) {   
  message.replyNoMention({embeds: [global]});
};

