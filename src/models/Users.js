const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  coins: { type: Number, default: 0 },
  guildId: { type: String, required: false },  
  blacklist: { 
    blacklisted: { type: Boolean, default: false }, 
    forEver: { type: Boolean, default: false }, 
    reason: { type: String, default: '' }, 
    blacklistedBy: { type: String }, 
    endedTimestamp: { type: Number }, 
  },
  balance: { type: Number, default: 0 },
  TotalBalance: { type: Number, default: 0 },
  TotalTransfer: { type: Number, default: 0 },
  TransferedUsers: [String],
});

UsersSchema.statics.get = async function (id) {
  const data = await this.findOne({ id });
  return data ? data : await this.create({ id });
}

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;