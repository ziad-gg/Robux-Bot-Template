const { Validation } = require('handler.djs');
const { ChannelType } = require('discord.js');

module.exports = new Validation()
.setCommnads('all')
.setExecution(Exection)
  
function Exection (controller, next, end) {
   if (controller.channel.type === ChannelType.DM && controller.Command.category == 'admins') {
     controller.reply({ content: "🔴 **Admin Command Is Not Allowed In Direct Channels !**" });
     return end();
   }
}