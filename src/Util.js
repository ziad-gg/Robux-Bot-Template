const usersData = require('./models/Users.js');
const guiData = require('./models/Users.js');
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

async function get(id) {
  const data = await this.findOne({ id });
  return data ? data : new this({ id });
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

Number.prototype.isNumber = isNumber;
Number.prototype.isInteger = isInteger;

Message.prototype.replyNoMention = replyNoMention;