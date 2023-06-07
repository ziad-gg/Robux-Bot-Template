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

client.Application.setPrefix("!");

client.Application.build();

client.Application.setData({
  roblox: zoblox
});

zoblox.on('userReady', () => console.log(`Logged is as: ${zoblox.me.username}`));
mongoose.connection.on('connected', () => console.log('Connect to mongoose database successfully'));

mongoose.connect(process.env.db);
zoblox.login(process.env.Cookie);
client.login(process.env.Token);