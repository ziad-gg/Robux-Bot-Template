const client = require('../index.js');
const roblox = client.Application.getData('roblox');
const GuildsData = client.Application.getData('guilds');
const RequestsData = client.Application.getData('requests');
const { DEFAULT_GUILD } = client.Application.getData('Constants');
 
async function setup() {
  console.log('???');
const guildData = await GuildsData.get(DEFAULT_GUILD);
  if (!guildData.group) return;
  
  const Group = await roblox.groups.get(guildData.group);
  if (!Group) return;
  
  /*setInterval(async () => {
  const Requests = await Group.requests.fetch({ limit: 10 });
  
  for (let Request of Requests.data) {
    const userId = Request.requester.userId;
    const RequestData = await RequestsData.findOne({ groupId: Group.id, userId });
    Request = await Group.requests.get(userId);
    if (RequestData.ban) {
      return Request.decline();
    } else {
      Request.accept();
    }
    RequestData.create({ groupId: Group.id, userId, requestDate: Request.created, joinDate: new Date() });
  } 
}, 3e4);*/
};

module.exports = async function() {
  console.log
};