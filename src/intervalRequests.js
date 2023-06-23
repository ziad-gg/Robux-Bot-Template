const client = require('../index.js');
const roblox = client.Application.getData('roblox') 

module.exports = (Group) => setInterval(async () => {
  let Requests = await Group.requests.fetch();
  for (const Request of Request.data) {
    Request = await Group.rrq
  } 
});                             