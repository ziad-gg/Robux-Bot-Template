const { Client, GatewayIntentBits } = require('discord.js');
const { Application } = require('handler.djs');
const path = require('node:path');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
    ] 
});

new Application(client, {
  commandsPath: path.join(__dirname, 'commands'),
});

client.Application.setPrefix("!");

client.Application.build();

client.login(process.env.Token);