const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('group')
  .setDescription('Set Main Roblox Group.')
  .setCategory('admins')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('id')
     .setDescription('Group Id To Select')
     .setRequired(true)))
  .setInteractionExecution(InteractionExecute)
  .isSubCommand()

async function InteractionExecute(interaction, global) { 
  const roblox = interaction.getData('roblox');
  const guildData = global.guild;
  const groupId = interaction[0];
  if (!groupId) return interaction.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف الجروب!**' });
  
  const group = await roblox.groups.get(groupId);
  if (!group) return interaction.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف جروب صحيح!**' });
  if (guildData.groupId === group.id) return interaction.replyNoMention({ content: '❌ **يبدو أن هذا الجروب محدد من قبل!**' });
  
  const owner = await group.members.me;
  if (!owner || !owner.isOwner()) return interaction.replyNoMention({ content: '❌ **يجب أن تكون انت مالك الجروب!**' });
  
  guildData.groupId = group.id
  await guildData.save();
  
  interaction.replyNoMention({ content: '**✅ تم تحديد الجروب بنجاح!**' });
};