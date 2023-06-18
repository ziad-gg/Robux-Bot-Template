const express = require('express');

const client = require('../../index.js');
const { DEFAULT_GUILD } = require('../../src/Constants.js')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
  
  const guild = await client.guilds.cache.get(DEFAULT_GUILD);
  if (!guild) return res.redirect('/');
  
  const GuildData = await client.Application.getData('guilds').get(guild.id);
  const UserData = await client.Application.getData('users').get(req.user.id);;
  
  const roblox = client.Application.getData('roblox');
  
  const group = await roblox.groups.get(GuildData.groupId);  
  const funds = await group.fetchCurrency().then((e) => e.robux);
  const pending = await group.fetchRevenueSummary().then((e) => e.pendingRobux);

  
  res.render('dashboard', {
    title: client.user.username + " | " + "dashboard",
    client,
    profile: req.user,
    group: {
      ...group,
      pending,
      funds
    },
    guild: guild,
    owner: await guild.fetchOwner().then((owner) => owner.user.username),
    data: GuildData,
    user: UserData
  });

})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/login');
});


router.post('/transfer', async (req, res) => {
  
  const controller = client.Application;
  const roblox = controller.getData('roblox');
  
  const GuildData = await controller.getData('guilds').get(DEFAULT_GUILD);
  const group = await roblox.groups.get(GuildData.groupId);  
  
  if (GuildData.tranfer.status || !GuildData.groupId || !group) return res.json({ error: true, message: '❌ التحويل مقفل في الوقت الحالي!' });
  
  
  const UserId = req.query.id;
  const username = req.query.username;
  const amount = req.query.amount;
  
  if (!UserId || !username || amount) return res.json({ error: true, message: '❌ Invalid Arguments' });
  
  if (GuildData.transfer.max < amount) return res.json({ error: true, message: `❌ الحد الأقصى التحويل هو ${GuildData.transfer.max}` });
  if (GuildData.transfer.min > amount) return res.json({ error: true, message: `❌ الحد الأدنى للتحويل هو ${GuildData.transfer.min}` });
   // خلاص هنعمل auth code الي هو توكن البوت
  // ازاي ?
  //الرابط من api يب يب انا عامل كذا في ttan
  const funds = await group.fetchCurrency().then((e) => e.robux);
  
  if (amount > funds)  return res.json({ error: true, message: `❌ الحد الأدنى للتحويل هو ${GuildData.transfer.min}` });
  
  const UserData = await controller.getData('users').get(req.user.id);
  
  
  
})


module.exports = router;