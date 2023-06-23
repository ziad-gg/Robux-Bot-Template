const client = require('../index.js');
const RequestsData = client.Application.getData('requests');

module.exports = (Group) => setInterval(async () => {
  let Requests = await Group.requests.fetch({ limit: 10 });
  for (const Request of Requests.data) {
    const userId = Request.requester.userId;
    const RequestData = await RequestsData.findOne({ userId });
    Request = await Group.requests.get(userId);
    RequestData.ban ? Request.decline() : Request.accept();
  } 
});                            