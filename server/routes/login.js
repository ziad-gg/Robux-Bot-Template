const express = require('express');
const passport = require('passport');

const client = require('../../index.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login/login', {
        tag: client.user.tag,
        user: client.user.username,
        avatar: client.user.avatarURL()
    })
})

router.get('/api', forwardAuthenticated, (req, res, next) => {
  res.send("Errrror")
    // passport.authenticate('discord', {
    //     successRedirect: '/home',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // })(req, res, next);
})

module.exports = router;
