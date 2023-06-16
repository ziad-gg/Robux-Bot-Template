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
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand();

async function Global(message, interaction, global) {
  const guildData = await global;
  const controller = message ?? interaction;
  const prefix = controller[0];
  
  if (!prefix) {
    if (guildData.prefix === DEFAULT_PREFIX) return controller.replyNoMention({ content: '❌ ****' });
    guildData.prefix = DEFAULT_PREFIX;
  } else {
    if (guildData.prefix === prefix) return controller.replyNoMention({ content: '❌ ****' });
    guildData.prefix = prefix;
  };
  
  await guildData.save();

  controller.replyNoMention({ content: '✅ **تم تحديد البادئة بنجاح!**' });
}

async function InteractionExecute(interaction, global) {};

async function MessageExecute(message, Global) {};