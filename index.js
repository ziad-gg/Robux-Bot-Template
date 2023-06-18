const { Client } = require('discord.js');
const { Zoblox, Events } = require('zoblox.js');
const { Application } = require('handler.djs');
const { DEFAULT_PREFIX, OWNERS, CLIENT_OPTIONS } = require('./src/Constants.js');
const mongoose = require('mongoose');
const path = require('node:path');

const client = new Client(CLIENT_OPTIONS);
const zoblox = new Zoblox();

new Application(client, {
  commandsPath: path.join(__dirname, 'commands'),
  validationPath: path.join(__dirname, 'validation'),
  EventsPath: path.join(__dirname, 'events'),
  owners: OWNERS,
  prefix: DEFAULT_PREFIX
})

client.Application.setCooldown({   
  message: '**{Username}**, Cooldown (**{counter}** left)', 
  reference: true, 
  long: true, 
  Mdelete: 2500,
  EphemeralReply: true,
  once: true
})

client.Application.build();
client.Application.setData({
  roblox: zoblox, 
  buy_cooldowns: new Map(),
  guilds: require('./src/models/Guilds.js'),
  users: require('./src/models/Users.js'),
});

zoblox.on(Events.UserReady, () => console.log(`Logged is as: ${zoblox.me.username} !`));
mongoose.connection.on('connected', () => console.log('Connected to database !'));

mongoose.connect(process.env.MONGO_URL);
zoblox.login(process.env.COOKIE);
client.login(process.env.TOKEN);

require('./src/Util.js');

module.exports = client