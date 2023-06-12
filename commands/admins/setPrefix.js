const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');
const { DEFAULT_PREFIX } = require('../../src/Constants.js');

module.exports = new CommandBuilder() 
  .setName('prefix')
  .setDescription('Change Current Prefix To Another One')
  .InteractionOn(new SlashCommandBuilder().addStringOption(option => option.setName('prefix').setDescription('The New Prefix To Set')))
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Guilds = controller.getData('guilds');
  const Guild = await Guilds.get(controller.guild.id);
  const prefix = controller[0];
    
  if (!prefix) {
    Guild.prefix = prefix;
    await Guild.save();
  } else {
    Guild.prefix = DEFAULT_PREFIX;
    await Guild.save();
  };
  
  return {
    interaction: '✅',
    message: '✅'
  }
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
}

function MessageExecute(message, global) {
  message.replyNoMention({ content: global });
};