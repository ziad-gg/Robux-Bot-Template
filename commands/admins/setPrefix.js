const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { CommandBuilder } = require('handler.djs');
const { DEFAULT_PREFIX } = require('../../src/Constants.js');

module.exports = new CommandBuilder()
  .setName('prefix')
  .setDescription('set new Command prefix')
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName('prefix')
     .setDescription('new prefix option')))
  .setGlobal(Global)
  .setMessageExecution(Message)
  .setInteractionExecution(Interaction)
  .isSubCommand();

async function Global(message, interaction, global) {
  const Guild = global.guild;
  const controller = message ?? interaction;
  const prefix = controller[0];
  
  if (!prefix) {
    if (Guild.prefix === DEFAULT_PREFIX) return controller.replyNoMention({ content: '❌' });
    Guild.prefix = DEFAULT_PREFIX;
  } else {
    if (Guild.prefix === prefix) return controller.replyNoMention({ content: '❌' });
    Guild.prefix = prefix;
  };
  
  await Guild.save();

  return {
    interaction: '✅',
    message: '✅'
  }
}

function Message (message, global) {
  message.replyNoMention({ content: global });
}

function Interaction (interaction, global) {
  interaction.replyNoMention({ content: global });
}