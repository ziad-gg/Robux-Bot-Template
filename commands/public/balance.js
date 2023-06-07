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
  
  if (args) {
    return console.log(args)  
  };
  
  const user = await controller.getUser(args.toId());
  if (!user) return controller.replyNoMention({ content: "> 🤔 **لا يمكنني العثور علي هذا العضو**" })
  const embed = new EmbedBuilder().setColor().setTitle(`رصيك الحالي هو ${user.balance}`)
   
  
}


function InteractionExecute(interaction, global) {
  interaction.replyNoMention({embeds: [global]});
};

function MessageExecute(message, global) {   
  message.replyNoMention({embeds: [global]});
};

