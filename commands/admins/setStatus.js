const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('status')
  .setDescription('Sets status.')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guildData = await global;
  const functions = controller.getData('functions');
  
  if (controller.GroupName === 'transfer') {
    guildData.transfer.status = !guildData.transfer.status;  
    await guildData.save();
    
    controller.replyNoMention({ content: `✅ **تم بنجاح ${guildData.transfer.status ? 'فتح' : 'قفل'} حالة السحب بنجاح!**` });
    
  } else if (controller.GroupName === 'buy') {
    guildData.buy.status = !guildData.buy.status;  
    await guildData.save();
   
    controller.replyNoMention({ content: `✅ **تم بنجاح ${guildData.transfer.buy ? 'فتح' : 'قفل'} حالة الشراء بنجاح!**` });
  };
    functions.UpdateStatusMessages(guildData, controller.client);
};

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};