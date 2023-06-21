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
  const guildData = await global;
  
  if (!controller[0]) return controller.replyNoMention({ content: '❌ **قم بتحديد الرتبة!**' });
  
  const role = controller.guild.roles.cache.get(interaction ? interaction[0].id : controller[0].toId());

  console.log(role);
  
  if (!role || role.tags.botId) return controller.replyNoMention({ content: '❌ **قم بتحديد رتبة صالحة!**' });
  if (guildData.clientsRole === role.id) return controller.replyNoMention({ content: '❌ **هذه الرتبة محددة من قبل!**' });
  
  guildData.clientsRole = role.id;
  await guildData.save();
  
  controller.replyNoMention({ content: '✅ **تم بنجاح تحديد رتبة العملاء!**' });
};