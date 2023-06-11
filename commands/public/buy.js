const { CommandBuilder } = require("handler.djs");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
  const Guild = await guifd.get(controller.guild.id);
  
  const userData = await Users.get(controller.author.id, controller.guild.id);
  const ownerId = await controller.guild.fetchOwner().then((owner) => owner.user.id);
  const price = Guild.price;
  
  const WantedToCompete = parseInt(amount * price);
  const embed = new EmbedBuilder()
    .setTimestamp();
  
  await controller.replyNoMention({ embeds: [embed] });
  const filter = '';
  const pay = controller.channel.createMessageCollector({ filter, time, max: 1 });
  const transactionId = 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  
  Cooldowns.set(key, {
    transactionId
  });

  pay.on("collect", async () => {
    userData.balance += +amount;
    await User.save();
  });

  collector.on("buyEnd", (e) => {
    if (!e)
      controller.replyNoMention({ content: `**لقد انتهي وقت التحويل 😒**` });
    Tickets.delete(key);
    BuyMessageGui.delete();
    clearTimeout(timeout);
  });
}

function InteractionExecute(interaction, global) {}

function MessageExecute(message, global) {}
