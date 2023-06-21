const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('total')
  .setDescription('Transfer someone specific balance.')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addUserOption((option) => 
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