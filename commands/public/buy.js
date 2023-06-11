const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder()
  .setName("buy")
  .setDescription("Buy a balance.")
  .setCategory("public")
  .setCooldown("15s")
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName("amount")
     .setDescription("Type Amount You Want To Buy Here")
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute);

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  if (!controller.channel.name.startsWith("ticket-")) return controller.replyNoMention({ content: "❌ **يمكن استخدام هذا الامر داحل التكت فقط!**" });

  const key = `${controller.author.id}-${controller.guild.id}`;
  const cooldowns = controller.getData("buy_cooldowns");
  const guildsData = controller.getData("guilds");
  const usersData = controller.getData("users");
  if (usersData.has(key)) return controller.replyNoMention({ content: "❌ **لديك عملية شراء بالفعل!**" });

  const amount = controller[0];
  const time = 3e5;
  const guildData = await guildsData.get(controller.guild.id);
  
  const userData = await usersData.get(controller.author.id, controller.guild.id);
  const recipientId = await controller.guild.fetchOwner().then((owner) => owner.user.id);
  const price = guildData.price;
  
  const embed = new EmbedBuilder()
    .setTimestamp();
  
  await controller.replyNoMention({ embeds: [embed] });
  const filter = m => m.author.id == '282859044593598464' && m.content.includes(`${price}`) & m.content.includes(`${recipientId}`) && m.content.includes(`${controller.author.username}`);
  const pay = controller.channel.createMessageCollector({ filter, time, max: 1 });
  const transactionId = 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  
  cooldowns.set(key, {
    transactionId
  });

  pay.on('collect', async () => {
    if (cooldowns.has(key)) {
    if (cooldowns.get(key).transactionId !== transactionId) return;
      
    userData.balance += +amount;
    await usersData.save();
      
    message.channel.send('✅ **تم بنجاح شحن رصيد لحسابك سيتم غلق التكت بعد 5 ثواني!**');
    setTimeout(() => message.channel.delete(), 5000);
    }
  });

  pay.on('end', (timeout) => {
    controller.replyNoMention({ content: '🕓 **لقد انتهى وقت التحويل المسموح لك بالتحويل!**' });
    cooldowns.delete(key);
  });
}

function InteractionExecute(interaction, global) {}

function MessageExecute(message, global) {}
