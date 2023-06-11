const mongoose = require('mongoose');
const { prefix } = require('../config.js');

const GuildsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    default: prefix
  },
  groupId: { type: Number },
  price: { type: Number, default: 1000 }, 
  proof: { type: String },
  clientR: { type: String },
  buy: {
    max: { type: Number },
    min: { type: Number },
  },
  transfer: {
    max: { type: Number },
    min: { type: Number },
  }
});


GuildsSchema.statics.get = async function (id) {
  const data = await this.findOne({ id });
  return data ? data : await this.create({ id });
}

const Guilds = mongoose.model("Guilds", GuildsSchema);

module.exports = Guilds;