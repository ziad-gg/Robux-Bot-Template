const mongoose = require('mongoose');

const GuildsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  groupId: { type: Number }
});

const Guilds = mongoose.model("Guilds", GuildsSchema);

module.exports = Guilds;