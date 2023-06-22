const { Validation } = require('handler.djs');

module.exports = new Validation()
  .setCommnads('all')
  .setExecution(Exection);

function Exection(controller, next, end) {
  
  if (!controller.author.isOwner && controller.Command.category === 'owners') return end();
  else next();
}