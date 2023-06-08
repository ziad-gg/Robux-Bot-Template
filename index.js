const { Client, GatewayIntentBits } = require('discord.js');
const { Application } = require('handler.djs');
const { Zoblox } = require('zoblox.js');
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
  once: true 
});

client.Application.setPrefix("!");
client.Application.build();
client.Application.setData({
  roblox: zoblox, 
  guilds: require('./src/models/Guilds.js'),
  users: require('./src/models/Users.js'),
});

zoblox.on('userReady', () => console.log(`Logged is as: ${zoblox.me.username} !`));
mongoose.connection.on('connected', () => console.log('Connected to database !'));

mongoose.connect(process.env.Mongo_Url);
zoblox.login(process.env.Cookie);
client.login(process.env.Token);
require('./src/util.js');