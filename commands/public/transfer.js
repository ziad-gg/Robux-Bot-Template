const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = new CommandBuilder()
  .setName('transfer')
  .setDescription('Transfer balance to robux.')
  .setCategory('public')
  .setCooldown('20s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(true).addStringOption((option) => option
     .setName('username')
     .setDescription('The username you want to transfer to')
     .setRequired(true)).addNumberOption((option) => option
        .setName('amount')
        .setDescription('The amount you want')
        .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute);

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const roblox = controller.getData('roblox');
  const Guilds = controller.getData('guilds');
  
  const Users = controller.getData('users');
  const username = controller[0];
  const amount = +controller[1];

  if (!username) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد اسمك في روبلوكس!**' });
  if (!amount) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد الرصيد الذي تود سحبه!**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بكتابة رقم صحيح!**' });

  const userData = await Users.get(controller.author.id, controller.guild.id);
  if (userData.balance < amount) return controller.replyNoMention({ content: '❌ **ليس لديك رصيد كافي!**' });

  let user = await roblox.users.find({ userNames: username });
  if (!user) return controller.replyNoMention({ content: '❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**' })
  user = await roblox.users.get(user.id);

  const Guild = await Guilds.get(controller.guild.id);
  const Group = await roblox.groups.get(Guild.groupId);
  
  if (Guild.transfer.max < amount) return message.replyNoMention({ content: `❌ **الحد الأقصى التحويل هو ${Guild.transfer.max}**` });
  if (Guild.transfer.min > amount) return message.replyNoMention({ content: `❌ **الحد الأدنى للتحويل هو ${Guild.transfer.min}**` });
  
  const member = await Group.members.get(user.id);
  if (!member) return controller.replyNoMention({ content: `❌ **هذا اللاعب غير متواجد في الجروب\nرابط الجروب:**\n${Group.linkURL()}`});

  const robux = await Group.getFunds().then((e) => e.robux);
  if (robux < amount) return controller.replyNoMention({ content: '❌ **عذرا ولاكن هذا العدد غير متوفر في الجروب في الوقت الحالي!**' });

  await member.payout({ amount }).then(async () => {
    controller.replyNoMention({ content: `✅ **تم بنجاح تحويل الروبوكس إلى ${username}**` });
    
    userData.balance -= amount;
    userData.transactionsTotal += amount;
    userData.transactionsCount += 1;
    await userData.save();
    
    const canvas = createCanvas(991, 172);
    const ctx = canvas.getContext('2d')
    const background = await loadImage('https://cdn.glitch.global/8e162bb4-d4c3-4bbc-8811-ac29c822a781/pay%20image%201.png?v=1657613444619');
    ctx.beginPath();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = '15px impact';
    ctx.fillStyle = 'black';
    ctx.fillText(amount.toLocaleString().toString(), 802.5, 42.4);
    ctx.font = "650 16px impact";
    ctx.fillText(amount.toLocaleString().toString(), 864.5, 82.5);
    ctx.fillText((robux - amount).toString(), 830.5, 105.7);
    ctx.font = "570 15.2px impact";
    ctx.fillText(username.toString(), 61, 35);
    ctx.font = '10px impact';
    ctx.fillStyle = 'Gray';
    ctx.fillText(member.role.name, 65, 47);
    ctx.closePath();
    const userImage = await loadImage(user.avatarURL({ type: 'Headshot' }));
    ctx.beginPath();
    ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(userImage, 11.5,16.5,35,35);
    
    const attach = new AttachmentBuilder(canvas.toBuffer(), { name: 'payout.png' });
    const channel = await controller.client.channels.cache.get(Guild.proof);
    
    if (channel) {
      channel.send({ content: `**تم الشراء بواسطة: ${controller.author}**`, files: [attach] });
    } else {
      controller.replyNoMention({ files: [attach] });
    }

  }).catch((e) => {
    if (e.message === '400 Payout is restricted.') { 
      controller.replyNoMention({ content: '❌ **هذا اللاعب جديد في الجروب!**' });
    } else {
      console.error(e);
      controller.replyNoMention({ content: '❌ **حدث خطأ ما**' });
    } 
  });
}

function InteractionExecute(interaction, global) {}

function MessageExecute(message, global) {}
