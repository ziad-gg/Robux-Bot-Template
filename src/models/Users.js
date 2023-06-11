const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  guildId: { type: String, required: false },  
  coins: { type: Number, default: 0 },
  blacklist: { 
    blacklisted: { type: Boolean, default: false }, 
    forEver: { type: Boolean, default: false }, 
    reason: { type: String, default: '' }, 
    blacklistedBy: { type: String }, 
    endedTimestamp: { type: Number }, 
  },
  buyedTotal: { type: Number, default: 0 },
  buyedCount: { type: Number, default: 0 },
  transactionsTotal: { type: Number, default: 0 },
  transactionsCount: { type: Number, default: 0 },
});

UsersSchema.statics.get = async function (id, guildId) {
  const data = await this.findOne({ id, guildId });
  return data ? data : await this.create({ id, guildId });
};

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;