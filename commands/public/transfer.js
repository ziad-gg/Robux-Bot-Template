const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = new CommandBuilder() 
  .setName("transfer")
  .setDescription("Change Your Current Balance to Robux.")
  .setCategory("public")
  .setCooldown('15s')
  .InteractionOn(new SlashCommandBuilder().addStringOption(op => op.setName('username').setDescription('player username').setRequired(true)).addNumberOption(op => op.setName('amount').setDescription('Type Amount You Want To transfer Here').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  
  const roblox = controller.getData('roblox');
  const Guilds = controller.getData('guilds');
  const Users = controller.getData('users');
  
  const username = controller[0];
  const amount = controller[1];
  
  if (!username) return controller.replyNoMention({ content: "" })
  if (!amount.isNumber()) return controller.replyNoMention({ content: "" })
  
  const User = await Users.get(controller.author.id);
  if (User.balance < amount) return controller.replyNoMention({ content: "" });
  
  let UserRbx = await roblox.users.find({ userNames: [username] });
  Usr
  

}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {
};