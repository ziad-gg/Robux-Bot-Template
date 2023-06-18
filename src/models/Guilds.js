const DataBaseManager = require('../DataBaseManager.js');
const mongoose = require('mongoose');
const { DEFAULT_PREFIX } = require('../Constants.js');

module.exports = new DataBaseManager(mongoose.model('Guilds', new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    default: DEFAULT_PREFIX
  },
  groupId: { 
    type: Number 
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
})));