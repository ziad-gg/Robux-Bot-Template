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
  if (this.valueOf().includes('l')) return parseInt(Math.random() * (20000 - 10000) + 10000);
}

function replyNoMention(options) {
  options = typeof options === 'string' ? { content: options } : options;
  options.allowedMentions = {
    repliedUser: false
  };
  return this.reply(options);
} 


function UpdateStatusMessages(guildData, client) {
  const data = guildData.schannels;
  
  data.forEach(async ({ ChannelId, MessageId }) => {
    const channel = client.channels.cache.get(ChannelId);
    const message = await channel.messages.fetch(MessageId).then(m => m).catch(e => null);
    
    const Bemoji = (guildData.buy.status) ? '🟢' : '🔴';
    const Temoji = (guildData.transfer.status) ? '🟢' : '🔴';
    
    const Btext = (guildData.buy.status) ? 'Open' : 'Closed';
    const Ttext = (guildData.transfer.status) ? 'Open' : 'Closed';
    
    const content = `**${Temoji} Robux Withdrawal System : ${Ttext}**\n\**${Bemoji} Robux Buy System : ${Btext}**` 
    
    if (!message) {
      channel.send({ content })
    } else {
      message.edit({ content });
    };
    
  })
};

function formateNum() {
  if (this < 1e3) return this;
  if (this >= 1e3 && this < 1e6) return +(this / 1e3).toFixed(1) + "K";
  if (this >= 1e6 && this < 1e9) return +(this / 1e6).toFixed(1) + "M";
  if (this >= 1e9 && this < 1e12) return +(this / 1e9).toFixed(1) + "B";
  if (this >= 1e12) return +(this / 1e12).toFixed(1) + "T";
};

String.prototype.toId = toId;
String.prototype.isNumber = isNumber;
String.prototype.isInteger = isInteger;
String.prototype.randomNum = randomNum;

Number.prototype.isNumber = isNumber;
Number.prototype.isInteger = isInteger;
Number.prototype.formateNum = formateNum;

Message.prototype.replyNoMention = replyNoMention;

module.exports.UpdateStatusMessages = UpdateStatusMessages;