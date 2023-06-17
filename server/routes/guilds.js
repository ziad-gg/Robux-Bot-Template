const express = require('express');
const dateformat = require('dateformat');
const number = require('easy-number-formatter');

const client = require('../../index.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

const router = express.Router();


router.get('/guilds', ensureAuthenticated, (req, res) => {
    let guilds = client.guilds.cache.toJSON();

    res.render('home/guilds', {
        guilds: guilds,
        profile: req.user,
        client: client,
        dateformat: dateformat,
        number: number,
    })
})

router.post('/guilds/leave/:id', ensureAuthenticated, (req, res) => {
    client.guilds.cache.get(req.params.id).leave().then(value => {
        req.flash('success', `Succesfully left guild "${value.name}"`)
        res.redirect('/guilds')
    })
})

module.exports = router;
