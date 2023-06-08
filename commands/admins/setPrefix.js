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
    Guild.prefix = config.prefix;
    await Guild.save()
  } else {
    Guild.prefix = prefix;
    await Guild.save()
  }
  
  return {
    interaction: "🟢",
    message: "🟢"
  }
}

function InteractionExecute(interaction, global) {
  interaction.react(global);
}

function MessageExecute(message, global) {
  message.react(global);
};