const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('setgroup')
  .setDescription('Set Main Roblox Group.')
  .setCategory('admins')
  .InteractionOn(new SlashCommandBuilder().addNumberOption(option => option.setName('id').setDescription('Group Id To Select').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  
  
  const cookies = controller.getData('cookies');
  const Guilds = controller.getData('guilds');
  
  const roblox = cookies.get(controller.guild.id);
  if (!roblox) return controller.replyNoMention({ content: '❌ **يحب ان تقوم بتسجيل الكوكي اولا**' });
  
  if (!await roblox.isLoged()) return controller.replyNoMention({ content: '❌ ** يجب ان تقوم بتسجيل كوكي صالح للاستخدام**' });
  
  const GroupId = controller[0] || controller['id'];
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
  };
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ content: global });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ content: global });
};

