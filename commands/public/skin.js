const { CommandBuilder } = require('handler.djs');

module.exports = new CommandBuilder() 
.setName("skin")
.setDescription("To get your roblox skin")
.setCategory("public")
.InteractionOn(new SlashCommandBuilder().addStringOption(option => option.setName('reason').setDescription('The reason for banning')))
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function MessageExecute(message) {
  const user = await zoblox.users.find({ userNames: arargs[0] );
};