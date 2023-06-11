const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('remove')
.setDescription('Give user an amount of robux.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder().addUserOption(op => op.setName('user').setDescription('User Acount to give Robux').setRequired(true)).addNumberOption(option => option.setName('amount').setDescription('Amount to Transfer To').setRequired(true)))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)


async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const Users = controller.getData('users');
  
  const UserId = controller[0];
  const Amount = controller[1];
  
  const User = await controller.getUser(UserId).then(u => u?.user?.id? u.user : u);
  const UserData = await Users.get(User.id, controller.guild.id);
  
  UserData.coins -= +Amount;
  
  await UserData.save();
  
  controller.replyNoMention({ content: `**تم ازاله ${Amount} من <@${UserId}>**` })  

  return; 
};

function InteractionExecute() {}
