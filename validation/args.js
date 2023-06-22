const { Validation } = require('handler.djs');

module.exports = new Validation()
  .setCommnads("all")
  .setExecution(Exection);

function Exection(controller, next, end) {
  const Command = controller.Command;
  const Attr = Command.getAttr('args');

  console.log(Command)
  
  if (Attr) {
    for (let i = 0; i < Attr; i++) {
      if (!controller[i]) {
        const Help = controller.Application.getCommand("help");
        controller[0] = Command.name;
        Help.global(controller);
        return end();
      }
    }
  } else {
    next();
  }
}
