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
  const Cookies = Guilds.find({ cookie: { $exists: true } });
  
  Cookies.forEach(async cookie => {
    const zoblox = new Zoblox();
    
  const LoggedData = await roblox.login(cookie).then((me) => me).catch(e => null);
    
  })
  
  
  console.log(`${client.user.tag} Is Online !`);
}