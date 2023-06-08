const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Application } = require('handler.djs');
const { Zoblox, Events } = require('zoblox.js');
const mongoose = require('mongoose');
const path = require('node:path');

const client = new Client({ intents: 3276799 });
const zoblox = new Zoblox()

new Application(client, {
  commandsPath: path.join(__dirname, 'commands'),
  EventsPath: path.join(__dirname, 'events')
});

client.Application.setCooldown({   
  message: "**{Username}**, Cooldown (**{counter}** left)", 
  reference: true, 
  long: true, 
  Mdelete: 2500,
  EphemeralReply: true,
  once: false 
});

client.Application.build();
client.Application.setData({
  roblox: zoblox, 
  tickets: new Collection(),
  guilds: require('./src/models/Guilds.js'),
  users: require('./src/models/Users.js'),
  config: require('./src/config.js')
});

zoblox.on(Events.UserReady, () => console.log(`Logged is as: ${zoblox.me.username} !`));
mongoose.connection.on('connected', () => console.log('Connected to database !'));

mongoose.connect(process.env.Mongo_Url);
zoblox.login(process.env.Cookie);
client.login(process.env.Token);
require('./src/util.js')