const { Partials, ActivityType } = require('discord.js');

module.exports.DEFAULT_PREFIX = '-'; // Default Prefix

module.exports.DEFAULT_GUILD = '936974185421475864'; //Server Id

module.exports.PROJECT_LINK = 'https://' + 'bot-robux' + '.glitch.me' // Your Project Web Url 

module.exports.CLIENT_OPTIONS = {
  intents: 3276799,
  partials: [Partials.Channel, Partials.User, Partials.Message, Partials.Reaction, Partials.GuildMember],
  presence: {
    status: 'Online',
    activities: [{
      type: ActivityType.Playing,
      name: '/help | Robux Factory'
    }]
  },
}; //Client Options

module.exports.OWNERS = [
  '789896576402587667',
  '860865950945378325-'
]; //Owners


// - - - - -
  
module.exports.PORT = 3000;

module.exports.UPTIME_API = 'https://web-uptimer.glitch.me';
