const { Validation } = require('handler.djs');

module.exports = new Validation()
  .setCommnads('all')
  .setExecution(Exection);

function Exection(controller, next, end) {
  const Command = controller.Command;
  const Attr = Command.getAttr('args');
    
  if (Attr) {
    for (let i=0;i<Attr;i++) {
      if (!controller[i]) {
        controller[0] = Command.name;
       
        const Help = controller.Application.getCommand('help');
        for (i=1;i<10;i++) controller[i] = null;
        Help.global(controller);
        return end();
      }
    }
  } else {
    next();
  }
}