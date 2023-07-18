const { Client } = require('discord.js');
const { CLIENT_OPTIONS } = require('./src/Constants.js');

const client = new Client(CLIENT_OPTIONS);

client.login(process.env.TOKEN)