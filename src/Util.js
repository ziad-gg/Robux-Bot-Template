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

function toNumber() {
  const units = {
    'k': 1e3,
    'm': 1e6,
    'b': 1e9,
    't': 1e12,
    'q': 1e15,
    's': 1e18,
  };

  const lastChar = this.charAt(this.length - 1);
  const unit = units[lastChar];

  if (unit) {
    const numericPart = parseFloat(this.slice(0, this.length - 1));
    return numericPart * unit;
  }

  return this;
}

function replyNoMention(options) {
  options = typeof options === 'string' ? { content: options } : options;
  options.allowedMentions = {
    repliedUser: false
  };
  return this.reply(options);
} 

function formateNum() {
  if (this < 1e3) return this;
  if (this >= 1e3 && this < 1e6) return +(this / 1e3).toFixed(1) + 'k';
  if (this >= 1e6 && this < 1e9) return +(this / 1e6).toFixed(1) + 'm';
  if (this >= 1e9 && this < 1e12) return +(this / 1e9).toFixed(1) + 'b';
  if (this >= 1e12) return +(this / 1e12).toFixed(1) + 't';
};

String.prototype.toId = toId;
String.prototype.isNumber = isNumber;
String.prototype.toNumber = toNumber;
String.prototype.isInteger = isInteger;

Number.prototype.isNumber = isNumber;
Number.prototype.toNumber = toNumber;
Number.prototype.isInteger = isInteger;
Number.prototype.formateNum = formateNum;

Message.prototype.replyNoMention = replyNoMention;