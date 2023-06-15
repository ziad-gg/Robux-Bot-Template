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
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)
.isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  controller.deferReply()
  const roblox = controller.getData('roblox');
  const guildData = global.guild;
  
  const groupId = controller[0];
  
  if (!groupId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف الجروب!**' });
  
  const group = await roblox.groups.get(groupId);
  if (!group) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف جروب صحيح!**' });
  if (guildData.groupId === group.id) return controller.replyNoMention({ content: '❌ **يبدو أن هذا الجروب محدد من قبل!**' });
  
  const owner = await group.members.me;
  if (!owner || !owner.isOwner()) return controller.replyNoMention({ content: '❌ **يجب أن تكون انت مالك الجروب!**' });
  
  guildData.groupId = group.id
  await guildData.save();
  
  return {
    interaction: (i) => {
      i.editReply({ content: '**✅ تم تحديد الجروب بنجاح!**' }) 
    },
    message: (m) => {  
      m.replyNoMention({ content: '**✅ تم تحديد الجروب بنجاح!**' }) 
    },
  };
}

async function InteractionExecute(interaction, global) { 
 global(interaction);
};

function MessageExecute(message, global) {
 global(message);
}