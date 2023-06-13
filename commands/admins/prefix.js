const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');
const { DEFAULT_PREFIX } = require('../../src/Constants.js');

module.exports = new CommandBuilder() 
.setName('prefix')
.setDescription('Change Current Prefix To Another One')
.InteractionOn(new SlashCommandBuilder().addStringOption((option) => option 
   .setName('prefix')
   .setDescription('The New Prefix To Set')
   .setRequired(false)))
.setGlobal(Global)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(InteractionExecute)
.isSubCommand()

async function Global(message, interaction, global) {
  const controller = message ?? interaction;
  const guild = global.guild;
  
  console.log("Hello World");
  
  const prefix = controller[0];
    
  if (!prefix) {
    guild.prefix = prefix;
    await guild.save();
  } else {
    guild.prefix = DEFAULT_PREFIX;
    await guild.save();
  };
 
  controller.replyNoMention({ content: '✅' });

}

async function InteractionExecute(interaction, global) {
  console.log("Hello World From Interaction")
  
}