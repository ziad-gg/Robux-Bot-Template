const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  guildId: { type: String, required: false },  
  balance: { type: Number, default: 0 },
  blacklist: { type: Boolean, default: false },
  buyedTotal: { type: Number, default: 0 },
  buyedCount: { type: Number, default: 0 },
  transactionsTotal: { type: Number, default: 0 },
  transactionsCount: { type: Number, default: 0 },
});

UsersSchema.statics.get = async function (id) {
  const userData = await this.findOne({ id });
  return userData ? userData : await this.create({ id });
};

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;