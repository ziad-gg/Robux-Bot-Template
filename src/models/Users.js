const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  guildId: { type: String, required: false },  
  balance: { type: Number, default: 0 },
  blacklist: { 
    blacklisted: { type: Boolean, default: false }, 
    forEver: { type: Boolean, default: false }, 
    reason: { type: String, default: '' }, 
    blacklistedBy: { type: String }, 
    endedTimestamp: { type: Number }, 
  },
  TotalBalance: { type: Number, default: 0 },
  TotalTransfer: { type: Number, default: 0 },
  TransferedUsers: [String],
});

UsersSchema.statics.get = async function (id, guildId) {
  const data = await this.findOne({ id, guildId });
  return data ? data : await this.create({ id, guildId });
};

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;