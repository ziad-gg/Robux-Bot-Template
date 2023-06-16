const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('group')
  .setDescription('Sets the group.')
  .setCategory('admins')
  .InteractionOn(new SlashCommandBuilder().addNumberOption((option) => option
     .setName('group')
     .setDescription('The group id do you want')
     .setRequired(false)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  const controller = message ?? interaction;
  const roblox = controller.getData('roblox');
  const guildData = await global;
  
  const groupId = controller[0];
  if (!groupId) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف الجروب!**' });
  
  const group = await roblox.groups.get(groupId);
  if (!group) return controller.replyNoMention({ content: '❌ **يجب أن تقوم بتحديد معرف جروب صحيح!**' });
  if (guildData.groupId === group.id) return controller.replyNoMention({ content: '❌ **يبدو أن هذا الجروب محدد من قبل!**' });
  
  const owner = await group.members.me;
  if (!owner || !owner.isOwner()) return controller.replyNoMention({ content: '❌ **يجب أن تكون انت مالك الجروب!**' });
  
  guildData.groupId = group.id;
  await guildData.save();
  
  return {
    interaction: (i) => {
      i.replyNoMention({ content: '**✅ تم تحديد الجروب بنجاح!**' });
    },
    message: (m) => {  
      m.replyNoMention({ content: '**✅ تم تحديد الجروب بنجاح!**' }) 
    },
  };
}

async function InteractionExecute(interaction, global) { 
};

async function MessageExecute(message, Global) {
 const global = await Global;
 const data = await global.message;
 data(message);
}