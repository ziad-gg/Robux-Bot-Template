const { Validation } = require('handler.djs');

module.exports = new Validation()
  .setCommnads('all')
  .setExecution(Exection);

async function Exection(controller, next, end) {
  const Constants = controller.Application.getData('Constants');
  const Guilds = controller.Application.getData('guilds');
  
  if (controller.Command.category === 'admins') {
    const Guild = await Guilds.get(Constants.DEFAULT_GUILD); 
    const Admins = Guild.admins;
    const isAdmin = Admins.find(admin => admin.id === controller.author.id);
    if (!isAdmin || !isAdmin.commands.includes(controller.Command.name)) {
      controller.replyNoMention("Your not In Admins List")
      return end()
    } else {
            
    }
  };
}