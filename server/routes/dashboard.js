const express = require('express');

const client = require('../../index.js');
const { DEFAULT_GUILD } = require('../../src/Constants.js')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
  
  const guild = await client.guilds.cache.get(DEFAULT_GUILD);
  const GuildData = await client.Applica
  if (!guild) return res.redirect('/');
  
  res.render('dashboard', {
    title: client.user.username + " | " + "dashboard",
    client,
    profile: req.user,
    group: 'roblox grooup',
    guild: guild,
    owner: await guild.fetchOwner().then((owner) => owner.user.tag),
    data:    

  });

})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/login');
});

module.exports = router;