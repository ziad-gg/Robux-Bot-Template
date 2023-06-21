const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('give')
  .setDescription('Transfer someone specific balance.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addUserOption((option) => option
     .setName('user')
     .setDescription('The user to transfer to')
     .setRequired(true)).addNumberOption((option) => option
        .setName('amount')
        .setDescription('The amount to transfer to')
        .setRequired(true)))
  .setGlobal(GlobalExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const usersData = controller.getData('users');
  const userId = controller[0]?.toId();
  if (!userId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد المستخدم!**' });
  
  const amount = +controller[1];
  if (!controller[1]) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد الرصيد!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
  
  const user = await controller.getUser(userId).then(u => u?.user?.id? u.user : u);
  const userData = await usersData.get(user.id, controller.guild.id);
  
  userData.balance += amount;
  await userData.save();
  
  controller.replyNoMention({ content: `✅ **تم بنجاح تحويل ${amount} الي ${user}\nرصيده الحالي هو ${userData.balance}**` });
};