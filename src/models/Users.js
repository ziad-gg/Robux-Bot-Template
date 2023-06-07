const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  balance: { type: Number, default: 0 },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;