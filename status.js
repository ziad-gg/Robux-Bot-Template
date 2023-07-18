const { Client } = require('discord.js');
const { CLIENT_OPTIONS } = require('./src/Constants.js');

const client = new Client(CLIENT_OPTIONS);
const TOKEN = process.argv[2];


console.log(CLIENT_OPTIONS);

client.on('ready', (client) => {
  console.log(client.user.username)
})

// console.log(process.env.token);

client.login('MTExODE3ODA4MTM0MTk2ODM4Ng.GqG5Ao.i2qzT4T_FR93jRJbWvJOxl_biyIdJbozxhtzbE');