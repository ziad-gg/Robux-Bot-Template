const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  guildId: { type: Number },
  balance: { type: Number, default: 0 },
});

UsersSchema.statics.get = async function (id) {
  const data = await this.findOne({ id });
  return data ? data : await this.create({ id });
}

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;