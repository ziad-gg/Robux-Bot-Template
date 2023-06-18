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
  const robux = await group.fetchCurrency().then((e) => e.robux);
  const pending = await group.fetchRevenueSummary().then((e) => e.pendingRobux);

  
  res.render('dashboard', {
    title: client.user.username + " | " + "dashboard",
    client,
    profile: req.user,
    group: {
      ...group,
      pending,
      funds: robux
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

module.exports = router;