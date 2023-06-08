const { EventBuilder } = require('handler.djs');
const { Events } = require('discord.js')
const { Zoblox } = require('zoblox.js');

module.exports = new EventBuilder()
.setEvent(Events.ClientReady)
.setExecution(Execute)

async function Execute(client) {
  const App = client.Application;
  
  const cookies = App.getData('cookies');
  const Guilds = App.getData('guilds');
  const FoundGuilds = await Guilds.find({ cookie: { $exists: true } });
  
  FoundGuilds.forEach(async Guild => {
    const roblox = new Zoblox();
    const LoggedData = await roblox.login(Guild.cookie).then((me) => me).catch(e => null);
    if (LoggedData) {
      console.log(`Logged is as: (${roblox.me.username})`)
      cookies.set(Guild.id, roblox)
    }
  });
  
  console.log(`${client.user.tag} Is Online !`);
}