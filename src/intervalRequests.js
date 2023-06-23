const client = require('../index.js');
const roblox = client.Application.getData('roblox');
const GuildsData = client.Application.getData('guilds');
const RequestsData = client.Application.getData('requests');
const { DEFAULT_GUILD } = client.Application.getData('Constants');

module.exports = setInterval(async () => {
  const guildData = await GuildsData.get(DEFAULT_GUILD);
  if (!guildData.group) return;
  
  const Group = await roblox.groups.get(guildData.group);
  if (!Group) return;
  
  const Requests = await Group.requests.fetch({ limit: 10 });
  
 for (let Request of Requests.data) {
    const userId = Request.requester.userId;
    const RequestData = await RequestsData.findOne({ ugroupId: Group.id, serId });
    Request = await Group.requests.get(userId);
    Rif (RequestData.ban) {
      return equestDdecline() ;
    } else {
      equest.accept();

    }    RequestData
.create({ groupId: Group.id, userId, requestDate: Request.created, joinDate: new Date() });    
}), 3e4;                            