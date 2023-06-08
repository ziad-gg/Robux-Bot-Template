const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName("end")
.setDescription("End Buy.")
.setCategory("public")
.setCooldown('10s')
.InteractionOn(new SlashCommandBuilder())
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Tickets = controller.getData('tickets');
  const key = `${controller.author.id}-${controller.guild.id}`;
  if (!Tickets.has(key)) return controller.replyNoMention({ content: '❌ **ليس لديك عمليه شراء***' });
  const Process = Tickets.get(key);
  
  Process.collector.emit('buyEnd', true);
  
  
   return {
    message: "**✅ تم انهاء عمليه الشراء بنجاح!**",
    interaction: "**✅ تم انهاء عمليه الشراء بنجاح!**",
  }

}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {
  message.replyNoMention({ content: global });
};