const express = require('express');

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

  if (GuildData.transfer.max < amount) return res.json({ error: true, message: `❌ الحد الأقصى التحويل هو ${GuildData.transfer.max}` });
  if (GuildData.transfer.min > amount) return res.json({ error: true, message: `❌ الحد الأدنى للتحويل هو ${GuildData.transfer.min}` });

  const funds = await group.fetchCurrency().then((e) => e.robux);
  if (amount > funds)  return res.json({ error: true, message: `❌ عذرا ولاكن هذا العدد غير متوفر في الجروب في الوقت الحالي!` });

  let user = await roblox.users.find({ userNames: username });
  if (!user) return res.json({ error: true, message: '❌ يبدو أن هذا اللاعب غير متواجد في روبلوكس!' })

  const member = await group.members.get(user.id);
  if (!member) return res.json({ error: true, message: `❌ هذا اللاعب غير متواجد في الجروب\nرابط الجروب:\n https://www.roblox.com/groups/${group.id}`});

  const UserData = await controller.getData('users').get(req.user.id);

  if (!UserData || UserData.balance < amount) return res.json({ error: true, message: '❌ رصيدك الحالي غير كافي للتحويل' });

  return res.json({ user: UserData, done: true });

})

module.exports = router;