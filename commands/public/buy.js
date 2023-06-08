const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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
  
  const amount = controller[0];
  const time = 300000;
  
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
   const collector = controller.channel.createMessageCollector(filter, { time });
  
  
   const BuyMessageGui = await controller.replyNoMention({ embeds: [embed] }); 
  
   Tickets.set(key, {
     channelId: controller.channel.id,
     messageId: BuyMessageGui.id,
     collector
   });
  
   let timout
  
   collector.on("collect", async() => {
       collector.stop()
       User.balance += +amount;
       await User.save();
       BuyMessageGui.delete();
       controller.replyNoMention(`**تمت عمليه الشراء سوف يتم قفل التكت 😊❤**`);
       await wait(5000);
       controller.channel.delete();
       Tickets.delete(key)
   });
  
  
   collector.on('buyEnd', () => {
        controller.replyNoMention(`**لقد انتهي وقت التحويل 😒**`);
        Tickets.delete(key)
        BuyMessageGui.delete()
   })
  
    timeout = setTimeout(() => {
       if (!Tickets.has(key)) return
      collector.emit('buyEnd')
    }, time)
  
  
  return {
    message: collector, 
    interaction: collector
  };
}

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {
};