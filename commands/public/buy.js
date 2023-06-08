const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("buy")
  .setDescription("Buy Some Roblox to UR Balance.")
  .setCategory("public")
  .setCooldown('15s')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(op => op.setName('amount').setDescription('Type Amount You Want To Buy Here').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  if (!controller.channel.name.startsWith("ticket-")) return controller.replyNoMention({ content: '❌ **يمكن استخدام هذا الامر داحل التكت فقط**' })
  
  const key = `${controller.author.id}-${controller.guild.id}`;
  const Tickets = controller.getData('tickets');
  const Guilds = controller.getData('guilds');
  const Users = controller.getData('users');
  
  if (Tickets.has(key)) return controller.replyNoMention({ content: '❌ **لديك عمليه شراء بالفعل**' });
  
  const amount = controller[0]
  
  const Guild = await Guilds.get(controller.guild.id);
  const User = await Users.get(controller.author.id);

  const ownerId = controller.guild.fetchOwner().then(owner => owner.user.id);
  const price = Guild.price
 
  const WantedToCompete = parseInt(amount * price);
  
  let embed = new EmbedBuilder().setColor("Gold").setTitle("رساله شراء")
    .setDescription(`   قم بتحويل  الي  <@${ownerId}> مبلغ ${WantedToCompete} \n\ 
       \`\`\` c ${ownerId} ${WantedToCompete} \`\`\`
       \n\
       **لانهاء عمليه الشراء اكتب end${controller.client.Application.prefix}**
       **يمكنك استخدام امر </credits:971443830870126632> اذا لم يعمل اختصار \`c\` **
    `).setFooter({ text: `لديك 5 دقائق للتحويل` }).setTimestamp()
  
   const filter = m => m.author.id === '282859044593598464' && m.content.includes(price) && m.content.includes(`<@!${ownerId}>`) ;
   const collector = controller.channel.createMessageCollector(filter, { time: 300000 });
  
   controller.replyNoMention({ embeds: [embed] }); 
  
  Tickets.set(key, {
    channelId: controller.channel.id,
    messageId: 
  })
  
   collector.on("collect", async() => {
       console.log("collected")
   });
  
   collector.once("end", async() => {
    
   });
  
  return {
    message: collector, 
    interaction: collector
  };
}

function InteractionExecute(interaction, global) {
  
};

function MessageExecute(message, global) {
};