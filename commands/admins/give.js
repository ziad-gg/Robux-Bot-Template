const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('give')
.setDescription('Give user an amount of robux.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder().addUserOption(op => op.setName('user').setDescription('User Acount to give Robux').setRequired(true)).addNumberOption(option => option.setName('amount').setDescription('Amount to Transfer To').setRequired(true)))
.setGlobal(GlobalExecute)
.OwnersOnly()
.setInteractionExecution(InteractionExecute)

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const Users = controller.getData('users');
  const UserId = controller[0];
  
  const Amount = controller[1];
  const User = await controller.getUser(UserId).then(u => u?.user?.id? u.user : u);
  
  const UserData = await Users.get(User.id, controller.guild.id);
  
  UserData.balance += +Amount;
  await UserData.save();
  
  controller.replyNoMention({ content: `**تم تحويل ${Amount} ل <@${UserId}>**` })  
};

function InteractionExecute() {}
