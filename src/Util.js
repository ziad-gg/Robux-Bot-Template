const { Message } = require('discord.js/src/structures/Message.js');

function toId() {
  return this.replace(/[<@#&!>]/g, '');
} 

function isNumber() {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
} 

function isInteger() {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) < 0) return false;
  return true;
} 

function randomNum() {
  if (this.valueOf().includes('s')) return parseInt(Math.random() * (10 - 1) + 1);
  if (this.valueOf().includes('l')) return parseInt(Math.random() * (10000 - 20000) + 20000);
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
String.prototype.isInteger = isInteger;
String.prototype.randomNum = randomNum;

Number.prototype.isNumber = isNumber;
Number.prototype.isInteger = isInteger;

Message.prototype.replyNoMention = replyNoMention;