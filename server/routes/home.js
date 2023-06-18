const express = require('express');

const client = require('../../index.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/', (req, res) => {

  res.render('home', {
    title: client.user.username + " | " + "dashboard"
  });

})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/login');
});

module.exports = router;