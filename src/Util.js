const { Message } = require('discord.js/src/structures/Message.js');

function toId() {
  return this.replaceAll(/[<@#&!>]/g, '');
} 

function isNumber() {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
} 

function replyNoMention(options) {
  if typeof 
  this.reply()
}


String.prototype.toId = toId;
String.prototype.isNumber = isNumber;

Number.prototype.isNumber = isNumber;

Messag.prototype..replyNoMention = replyNoMention 