const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder()
  .setName('buy')
  .setDescription('Buy a balance.')
  .setCooldown('20s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you want to buy')                                                          
     .setRequired(true)))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  let buyed = false;
  const controller = message ?? interaction;
  if (!controller.channel.name.startsWith('ticket-')) return;

  const key = `${controller.author.id}-${controller.guild.id}`;
  const cooldowns = controller.getData('buy_cooldowns');
  const guildsData = controller.getData('guilds');
  const usersData = controller.getData('users');
  if (cooldowns.has(key)) return controller.replyNoMention({ content: '❌ **لديك عملية شراء بالفعل!**' });

  const amount = +controller[0];
  if (!controller[0]) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد الرصيد الذي تريده!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد رقم صحيح!**' });
  
  const time = 3e5;
  const guildData = await guildsData.get(controller.guild.id);
  if (guildData.buy.min > amount) return message.replyNoMention({ content: `❌ **الحد الأدنى للشراء هو ${guildData.buy.min}**` });
  if (guildData.buy.max < amount) return message.replyNoMention({ content: `❌ **الحد الأقصى للشراء هو ${guildData.buy.max}**` });
  
  const userData = await usersData.get(controller.author.id, controller.guild.id);
  const recipientId = await controller.guild.fetchOwner().then((owner) => owner.user.id);
  const price = guildData.price;
  const tax = Math.ceil(price * 20 / 19);
  
  await controller.replyNoMention({ content : `\`\`\`c ${recipientId} ${tax}\`\`\`` });
  const filter = m => m.author.id == '282859044593598464' && m.content.includes(`${price}`) & m.content.includes(`${recipientId}`) && m.content.includes(`${controller.author.username}`);
  const pay = controller.channel.createMessageCollector({ filter, time, max: 1 });
  const transactionId = 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  
  cooldowns.set(key, {
    transactionId
  });

  pay.on('collect', async () => {
    if (cooldowns.has(key)) {
    if (cooldowns.get(key).transactionId !== transactionId) return;

    userData.balance += amount;
    userData.buyedTotal += amount;
    userData.buyedCount += 1;
    buyed = true;
    await userData.save();

    controller.channel.send({ content: `**✅ تم بنجاح شراء \`${amount}\` رصيد!\nرصيدك الحالي: \`${userData.balance}RB\`.**` });

    setTimeout(() => {
      controller.channel.delete();
      cooldowns.delete(key);
    }, 5000);
  }
});
  
 pay.on('end', async () => {
   if (buyed) return;
   if (cooldowns.has(key)) {
   if (cooldowns.get(key).transactionId !== transactionId) return;
  
   await cooldowns.delete(key); 
   controller.channel.send({ content: '🕓 **لقد انتهى وقت التحويل المسموح لك بالتحويل!**' });
   }
 });
};