const mongoose = require('mongoose');

consgnew mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  balance: { 
    type: Number, 
    default: 0 
  },
  blacklist: { 
    type: Boolean, 
    default: false 
  },
  buyedTotal: { 
    type: Number, 
    default: 0 
  },
  buyedCount: { 
    type: Number, 
    default: 0 
  },
  transactionsTotal: { 
    type: Number, 
    default: 0 
  },
  transactionsCount: { 
    type: Number, 
    default: 0 
  },
  lastTransactionsAccount: { 
    type: String 
  }
}));