const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('set')
.setDescription('This Command is To manage a multi tasks.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder())
.setGlobal(GlobalExecute)
.setSubcommands([
   { command: 'proofchannel' },
   { command: 'clientrole' },
])

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const Guilds = controller.getData('guilds');
  const guild = await Guilds.get(controller.guild.id);
  
  return {
    interaction: {
      guild
    }
  }
}