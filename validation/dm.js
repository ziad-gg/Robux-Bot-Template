const { Validation } = require('handler.djs');
const { ChannelType } = require('discord.js');

module.exports = new Validation()
  .setCommnads('all')
  .setExecution(Exection);

function Exection(controller, next, end) {
  const allowed = ['balance', 'transfer'];

  if (controller.channel?.type === ChannelType.DM && !allowed.includes(controller.Command.name)) {
    controller.replyNoMention({ content: '❌ **يمكنك استخدام هذا الأمر في السيرفر فقط!**' });
    return end();
  } else {
    next();
  }
}
