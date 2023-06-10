const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')

module.exports = new EventBuilder()
.setEvent(Events.ClientReady)
.setExecution(Execute)

async function Execute(client) {
  const Users = client.Application.getData('users');
  const OldUsers = await Users.find({ guildId: '905921752293601370' });
  OldUsers.forEach(user => {
    user.id = user.userId
    user.balance = user.coins;
    user.save();
  })
  console.log(`${client.user.tag} Is Online !`);
}