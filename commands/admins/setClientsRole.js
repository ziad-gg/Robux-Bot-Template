const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('clientsrole')
  .setDescription('Set client Role.')
  .InteractionOn(new SlashCommandBuilder().addRoleOption(option => option
     .setName('role')
     .setDescription('Role Option to select')
     .setRequired(true)))
  .setInteractionExecution(InteractionExecute)
  .isSubCommand()

async function InteractionExecute(interaction, global) {
  const guild = global.guild;
  const RoleId = interaction[0];

  guild.clientR = RoleId;
  await guild.save();
  
  interaction.replyNoMention({ content: `تم تحديد <@&${guild.proof}> رول العميل` })
};