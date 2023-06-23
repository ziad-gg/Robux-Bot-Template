const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  groupId: {
    required: true,
    type: String
  },
  userId: String,
  requestDate: String, 
  joinDate: String, 
}); 

Schema.statics.get = async function (id, key = "userId") {
  const query = {};
  query[key] = id;
  const old = await this.findOne(query);
  return old; 
};

Schema.statics.create = async function ({ groupId, userId, requestDate, joinDate }) {
  if (!groupId || !userId || !requestDate || !joinDate) throw new Error('Please, provide an groupId, userId, requestDate, joinDate');
  const user = await this.findOne({ groupId, userId });
  if (user) await user.updateOne({ requestDate, joinDate });
  else await this.create({ groupId, userId, requestDate, joinDate }).catch(console.error);
};

module.exports = mongoose.model('Requests', Schema);