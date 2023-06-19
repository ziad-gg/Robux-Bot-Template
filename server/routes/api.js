const express = require('express');
const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

const client = require('../../index.js');
const { DEFAULT_GUILD } = require('../../src/Constants.js')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/t', async (req, res) => {
  
  const controller = client.Application;
  const roblox = controller.getData('roblox');

  const GuildData = await controller.getData('guilds').get(DEFAULT_GUILD);
  const group = await roblox.groups.get(GuildData.groupId);  

  if (GuildData.transfer.status || !GuildData.groupId || !group) return res.json({ error: true, message: '❌ التحويل مقفل في الوقت الحالي!' });

  const UserId = req.query.id;
  const username = req.query.username;
  const amount = req.query.amount;

  if (!UserId || !username || !amount || !amount.isNumber()) return res.json({ error: true, message: '❌ Invalid Arguments' });

  if (GuildData.transfer.min > amount) return res.json({ error: true, message: `❌ الحد الأدنى للتحويل هو ${GuildData.transfer.min}` });
  if (GuildData.transfer.max > 0 && GuildData.transfer.max < amount) return res.json({ error: true, message: `❌ الحد الأقصى التحويل هو ${GuildData.transfer.max}` });
  
  const funds = await group.fetchCurrency().then((e) => e.robux);
  if (amount > funds)  return res.json({ error: true, message: `❌ عذرا ولاكن هذا العدد غير متوفر في الجروب في الوقت الحالي!` });

  let user = await roblox.users.find({ userNames: username });
  if (!user) return res.json({ error: true, message: '❌ يبدو أن هذا اللاعب غير متواجد في روبلوكس!' })

  user = await roblox.users.get(user.id);
  const member = await group.members.get(user.id);
  if (!member) return res.json({ error: true, message: `❌ هذا اللاعب غير متواجد في الجروب\nرابط الجروب:\n https://www.roblox.com/groups/${group.id}`});

  const UserData = await controller.getData('users').get(UserId);
  if (!UserData || UserData.balance < amount) return res.json({ error: true, message: '❌ رصيدك الحالي غير كافي للتحويل' });

  const donechannel = await client.guilds.cache.get(DEFAULT_GUILD)?.channels?.cache.get(GuildData?.proofsChannel);
  UserData.balance -= +amount;
  
  UserData.save();
  
  
  res.json({ user: UserData, done: true, donechannel });

  const canvas = createCanvas(991, 172);
  const ctx = canvas.getContext('2d')
  const background = await loadImage('https://cdn.glitch.global/60d2234a-7ca2-4fc7-a312-190e5d8c2e88/Picsart_23-02-24_20-56-24-896.jpg?v=1677265030940');
 
  ctx.beginPath();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.font = '15px impact';
  ctx.fillStyle = 'black';
  ctx.fillText(amount.toLocaleString(), 802.5, 42.4);
  ctx.font = '650 16px impact';
  ctx.fillText(amount.toLocaleString(), 864.5, 82.5);
  ctx.fillText((funds - amount).toLocaleString(), 830.5, 105.7);
  ctx.font = '570 15.2px impact';
  ctx.fillText(username, 61, 35);
  ctx.closePath();

  const userImage = await loadImage(user.avatarURL({ type: 'Headshot' }))
  ctx.drawImage(userImage, 11.5,16.5,35,35);

  const attach = new AttachmentBuilder(canvas.toBuffer(), { name: 'payout.png' });

  donechannel.send({ content: `**تم الشراء بواسطة: <@${UserId}>**`, files: [attach] });
  
  
});

module.exports = router;