const { CommandBuilder } = require("handler.djs");
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports = new CommandBuilder()
  .setName("transfer")
  .setDescription("Change Your Current Balance to Robux.")
  .setCategory("public")
  .setCooldown("15s")
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName("username")
     .setDescription("player username")
     .setRequired(true)).addNumberOption((option) => option
        .setName("amount")
        .setDescription("Type Amount You Want To transfer Here")
        .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute);

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;

  const roblox = controller.getData("roblox");
  const Guilds = controller.getData("guilds");
  const Users = controller.getData("users");
  const username = controller[0];
  const amount = controller[1];

  if (!username) return controller.replyNoMention({ content: "❌ **يجب أن تقوم بتحديد اسمك في روبلوكس!**" });
  if (!amount) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد الروبكس افدي**' });
  if (!amount.isNumber()) return controller.replyNoMention({ content: '❌ **يجب أن تكتب رقم صالحا!**' });

  const userData = await Users.get(controller.author.id, controller.guild.id);
  if (userData.balance < amount) return controller.replyNoMention({ content: "" });

  let user = await roblox.users.find({ userNames: username });
  console.log(user);
  if (!user) return controller.replyNoMention({ content: "" })
  user = await roblox.users.get(user.id);

  const Guild = await Guilds.get(controller.guild.id);
  const Group = await roblox.groups.get(Guild.groupId);
  
  if (Guild.transfer.max < amount) return message.replyNoMention({ content: `الحد الاقصي للتحويل هو ${Guild.transfer.max}` });
  if (Guild.transfer.min > amount) return message.replyNoMention({ content: `الحد الاقل للتحويل هو ${Guild.transfer.min}` });
  
  const member = await Group.members.get(user.id);

  if (!member) return controller.replyNoMention({ content: `❌ **يجب ان تكون داخل الجروب لاستلام الروبوكس**`});

  const robux = await Group.getFunds().then((e) => e.robux);
  if (robux < amount) return controller.replyNoMention({ content: "" });

  member.payout({ amount }).then(async () => {
    
    const url = user.avatarURL({ type: 'Headshot' });
    
    user.coins -= +amount;
    await user.save()
    
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
    ctx.fillText('Member', 65, 47);
    ctx.closePath();
    const userImage = await loadImage(url.toString());
    ctx.beginPath();
    ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(userImage, 11.5,16.5,35,35);
    
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'payout.png' });
    const channel = await controller.channels.cache.get(Guild.proof);
    
    if (channel) {
      channel.send({ files: [attachment] });
    } else {
      controller.channel.send({ files: [attachment] });
    }
    

  }).catch((e) => {
     if (e.message.includes("401")) return controller.replyNoMention({ content: "" });
  });
  
  return;
}

function InteractionExecute(interaction, global) {}

function MessageExecute(message, global) {}
