const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("setprefix")
  .setDescription("Change Current Prefix To Another One")
  .setCategory("admins")
  .InteractionOn(new SlashCommandBuilder().addStringOption(op => op.setName('prefix').setDescription('The New Prefix To Set')))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const config = controller.getData('config');
  const Guilds = controller.getData('guilds');
  const Guild = await Guilds.get(controller.guild.id);
  const prefix = controller[0];
  
  if (!prefix) {
    if (Guild.prefix === config.prefix) return controller.replyNoMention({ content: '❌ **هذه البادئة محددة من قبل!**' });
    Guild.prefix = config.prefix;
    await Guild.save()
  } else {
    if (Guild.prefix === prefix) return controller.replyNoMention({ content: '❌ **هذه البادئة محددة من قبل!**' });
    Guild.prefix = prefix;
    await Guild.save()
  }
  
  return {
    interaction: "✅",
    message: "✅"
  }
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
}

function MessageExecute(message, global) {
  message.replyNoMention({ content: global });
};