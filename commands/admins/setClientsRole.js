const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('clientsrole')
  .setDescription('Sets clients Role.')
  .InteractionOn(new SlashCommandBuilder().addRoleOption(option => option
     .setName('role')
     .setDescription('Role Option to select')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(interaction, global) {
  const guild = global.guild;
  const RoleId = interaction[0];

  guild.clientsRole = RoleId;
  await guild.save();
  
  interaction.replyNoMention({ content: `تم تحديد <@&${guild.proof}> رول العميل` });
};