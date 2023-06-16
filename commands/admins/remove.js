const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('remove')
  .setDescription('Remove someone specific balance.')
  .setCategory('admins')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addUserOption((option) => option
     .setName('user')
     .setDescription('The user from whom the balance is to be removed')
     .setRequired(true)).addNumberOption((option) => option
        .setName('amount')
        .setDescription('The amount to remove')
        .setRequired(true)))
  .setGlobal(GlobalExecute)
  .OwnersOnly()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const usersData = controller.getData('users');
  const userId = controller[0]?.toId();
  if (!userId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد المستخدم!**' });
  
  const amount = +controller[1];
  if (!amount) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد الرصيد!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
  
  const user = await controller.getUser(userId).then(u => u?.user?.id? u.user : u);
  const userData = await usersData.get(user.id, controller.guild.id);
  if (userData.balance < amount) return controller.replyNoMention({ content: '❌ **رصيد هذا الشخص اقل من المبلغ المراد خصمه!**' });
    
  userData.balance -= amount;
  await userData.save();
  
  controller.replyNoMention({ content: `✅ **تم بنجاح خصم ${amount} من ${user}\nرصيده الحالي هو ${userData.balance}**` });
};