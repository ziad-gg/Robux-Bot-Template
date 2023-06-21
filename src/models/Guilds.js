const mongoose = require('mongoose');
const { DEFAULT_PREFIX } = require('../Constants.js');

const GuildsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    default: DEFAULT_PREFIX
  },
  groupId: { 
    type: Number 
  },
  recipient: {
    type: String,
  },
  price: { 
    type: Number, 
    default: 1000 
  }, 
  proofsChannel: { 
    type: String 
  },
  clientsRole: { 
    type: String 
  },
  schannels: [{ MessageId: String, ChannelId: String }],
  buy: {
    max: { 
      type: Number, 
      default: 0 
    },
    min: { 
      type: Number, 
      default: 1 
    },
  },
  transfer: {
    max: { 
      type: Number, 
      default: 0 
    },
    min: { 
      type: Number, 
      default: 1 
    },
  }
});

GuildsSchema.statics.get = async function (id) {
  const guildData = await this.findOne({ id });
  return guildData ? guildData : new this({ id });
}

const Guilds = mongoose.model('Guilds', GuildsSchema);

module.exports = Guilds;