const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName('status')
.setDescription('Set Status.')
.InteractionOn(new SlashCommandBuilder())
.setInteractionExecution(InteractionExecute)
.isSubCommand()

async function InteractionExecute(interaction, global) {
  const guildData = global.guild;
  
  if (interaction.GroupName === 'transfer') {
    guildData.transfer.status = !!guild.transfer.status;  
    await guildData.save();
    
    interaction.replyNoMention({ content: `> **Done ${interaction.GroupName} ${interaction.GroupChildName } is now ${guild.transfer.status ? "on" : "off"}**` })
  } else {
    guild.buy.status = !!guild.buy.status;  
    await guild.save();
    
    interaction.replyNoMention({ content: `> **Done ${interaction.GroupName} ${interaction.GroupChildName } is now ${guild.buy.status  ? "on" : "off"}**` })
  };
};