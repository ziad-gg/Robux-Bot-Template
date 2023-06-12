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

async function InteractionExecute(interaction) { 
  const roblox = interaction.getData('roblox');
  const guildData = global.guild;
  const GroupId = interaction[0];
  if (!GroupId) return interaction.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف الجروب!**' });
  
  const Group = await roblox.groups.get(GroupId);
  if (!Group) return interaction.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف جروب صحيح!**' });

  const owner = await Group.members.me;
  if (!owner || !owner.isOwner()) return interaction.replyNoMention({ content: '❌ **يجب أن تكون انت مالك الجروب!**' });
    
  guildData.groupId = Group.id;
  await guildData.save();
  
  interaction.replyNoMention({ content: '**✅ تم تحديد الجروب بنجاح!**' });
};