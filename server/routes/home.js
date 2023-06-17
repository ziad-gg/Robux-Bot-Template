const express = require('express');
const dateformat = require('dateformat');
const number = require('easy-number-formatter');

const client = require('../../index.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/home')
})

router.get('/home', ensureAuthenticated, (req, res) => {

  res.render('home/home', {
    profile: req.user,
    client: client,
    joinedDate: dateformat(`${client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'),
    prefix: client.Application.prefix,
    number,
  });

})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/login');
});

module.exports = router;
