const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder()
  .setName('buy')
  .setDescription('Buy a balance.')
  .setCategory('public')
  .setCooldown('20s')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('amount')
     .setDescription('The amount you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute);

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  if (!controller.channel.name.startsWith("ticket-")) return controller.replyNoMention({ content: "❌ **يمكن استخدام هذا الامر داحل التكت فقط!**" });

  const key = `${controller.author.id}-${controller.guild.id}`;
  const cooldowns = controller.getData('buy_cooldowns');
  const guildsData = controller.getData('guilds');
  const usersData = controller.getData('users');
  if (cooldowns.has(key)) return controller.replyNoMention({ content: '❌ **لديك عملية شراء بالفعل!**' });

  const amount = +controller[0];
  if (!amount) return controller.replyNoMention({ content: '' } =
  
  const time = 3e5;
  const guildData = await guildsData.get(controller.guild.id);
  
  const userData = await usersData.get(controller.author.id, controller.guild.id);
  const recipientId = await controller.guild.fetchOwner().then((owner) => owner.user.id);
  const price = guildData.price;
  
  await controller.replyNoMention({ content : `\`\`\`c ${recipientId} ${price}\`\`\`` });
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
    await usersData.save();

    message.reply(`**✅ تم بنجاح شراء \`${amount}\` رصيد!\nرصيدك الحالي: \`${userData.balance}RB\`.**`);

    setTimeout(() => {
      message.channel.delete()
      cooldowns.delete(key);
    });
  }
});
  
 pay.on('end', async () => {
   if (cooldowns.has(key)) {
   if (cooldowns.get(key).transactionId !== transactionId) return;
  
   await cooldowns.delete(key); 
   controller.replyNoMention({ content: '🕓 **لقد انتهى وقت التحويل المسموح لك بالتحويل!**' });
   }
 });
}

function InteractionExecute(interaction, global) {}

function MessageExecute(message, global) {}
