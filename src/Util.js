const { Message } = require('discord.js/src/structures/Message.js');

function toId() {
  return this.replaceAll(/[<@#&!>]/g, '');
} 

function isNumber() {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
} 

function replyNoMention(options) {
  options = typeof options === 'string' ? { content: options } : options;
  options.allowedMentions = {
    repliedUser: false
  };
  return this.reply(options);
} 
  
String.prototype.toId = toId;
String.prototype.isNumber = isNumber;

Number.prototype.isNumber = isNumber;

Message.prototype.replyNoMention = replyNoMention;