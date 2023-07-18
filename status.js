const { Client } = require('discord.js');
const { CLIENT_OPTIONS } = require('./src/Constants.js');

const client = new Client(CLIENT_OPTIONS);
const Data = process.argv;

console.log(Data)

// client.login(process.env.TOKEN);