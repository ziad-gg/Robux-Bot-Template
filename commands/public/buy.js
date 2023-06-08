const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("buy")
  .setDescription("Buy Some Roblox to UR Balance.")
  .setCategory("public")
  .setCooldown('15s')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('amount').setDescription('Type Amount You Want To Buy Here').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  if (!controller.channel.name.startsWith("ticket")) return controller.replyNoMention({ content: '❌ **يمكن استخدام هذا الامر داحل التكت فقط**' })
  
  const key = `${controller.author.id}-${controller.guild.id}`;
  const Tickets = controller.getData('tickets');
  const Guilds = controller.getData('guilds');
  const Users = controller.getData('users');
  
  if (Tickets.has(key)) return controller.replyNoMention({ content: '❌ **لديك عمليه شراء بالفعل**' });
  
  const Guild = await Guilds.get(controller.guild.id);
  const User = await Users.get(controller.author.id);

  const ownerId = controller.guild.fetchOwner().then(console.log);
  const price = Guild.price
  
     
  return {
    message: null, 
    interaction: null
  };
}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {
};