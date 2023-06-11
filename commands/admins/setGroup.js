const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('group')
  .setDescription('Set Main Roblox Group.')
  .setCategory('admins')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(option => option.setName('id').setDescription('Group Id To Select').setRequired(true)))
//  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const roblox = controller.getData('roblox');
  const Guilds = controller.getData('guilds');
  
  const GroupId = controller[0];
  if (!GroupId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف الجروب!**' });
  
  const Group = await roblox.groups.get(GroupId);
  if (!Group) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف جروب صحيح!**' });

  const owner = await Group.members.me;
  if (!owner || !owner.isOwner()) return controller.replyNoMention({ content: '❌ **يجب أن تكون انت مالك الجروب!**' });
  
  const Guild = await Guilds.get(controller.guild.id);
  
  Guild.groupId = Group.id;
  await Guild.save();
  
  return {
    message: "**✅ تم تحديد الجروب بنجاح!**",
    interaction: "**✅ تم تحديد الجروب بنجاح!**",
  }
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ content: global });
};

