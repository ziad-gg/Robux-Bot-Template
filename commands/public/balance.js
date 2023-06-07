const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName("balance")
.setDescription("Get Your Current Currency")
.setCategory("public")
.InteractionOn(new SlashCommandBuilder().addUserOption(option => option.setName('user').setDescription('User To Get Information of His Currency').setRequired(true)))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute (message, interaction) {
  
  const controller =  message ?? interaction;
  const Users = controller.getData('Users');
  
  const args = controller[0];
  
  let user = controller.author

  if (args) user = await controller.guild.members.fetch(args.toId()).then(data => data.user).catch(e => null);
  
  if (!user) return controller.replyNoMention({ content: "> 🤔 **لا يمكنني العثور علي هذا العضو**" });
    
  if (user.bot) return controller.replyNoMention({ content: "> 🤔 **البوتات لا تملك حساب**" });
  
  const embed = new EmbedBuilder().setColor().setTitle((controller.author.id === user.id) ? `رصيدك الحالي هو ${data.balance}` : ``)
   
  return {
    message: embed,
    interaction: embed ?? "Num"
  }
  
}


function InteractionExecute(interaction, global) {
  interaction.replyNoMention({embeds: [global]});
};

function MessageExecute(message, global) {   
  console.log("Hello From Message")
  message.replyNoMention({embeds: [global]});
};

