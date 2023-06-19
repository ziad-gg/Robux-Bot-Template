const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('clientsrole')
  .setDescription('Sets clients Role.')
  .InteractionOn(new SlashCommandBuilder().addRoleOption((option) => option
     .setName('role')
     .setDescription('The clientsrole you want')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const guild = await global;
  const RoleId = interaction[0];

  guild.clientsRole = RoleId;
  await guild.save();
  
  interaction.replyNoMention({ content: `تم تحديد <@&${guild.proof}> رول العميل` });
};