const { Client, GatewayIntentBits } = require('discord.js');
const { Application } = require('handler.djs');
const { Zoblox } = require('zoblox.js');
const path = require('node:path');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
    ] 
});

const zoblox = new Zoblox()

new Application(client, {
  commandsPath: path.join(__dirname, 'commands'),
  EventsPath: path.join(__dirname, 'events')
});

client.Application.setPrefix("!");

client.Application.build();

client.Application.setData({
  zob: zoblox
});

client.login(process.env.Token);