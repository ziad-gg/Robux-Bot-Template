const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('setgroup')
  .setDescription("Set Main Roblox Group.")
  .setCategory("admins")
  .InteractionOn(new SlashCommandBuilder().addNumberOption(option => option.setName('id').setDescription('Group Id To Select').setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) { 
  const controller = message ?? interaction;
  const roblox = controller.getData('roblox');
  const Guilds = controller.getData('guilds');
  
  const GroupId = controller[0];
  if (!GroupId) return controller.replyNoMention({ content: "يجب عليك ادخال اي دي الجروب" });
  
  const Group = await roblox.groups.get(GroupId);
  if (!Group) return controller.replyNoMention({ content: "يبدو ان اي دي الجروب غير صحيح" });

  const owner = await Group.members.me;
  if (!owner || !owner.isOwner()) controller.replyNoMention({ content: "يجب ان يكون المستخدم صاحب الجروب" });
  
  
  
  return {
    message: 0,
    interaction: 0,
  }
  
};

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({embeds: [global]});
};

function MessageExecute(message, global) {   
  message.replyNoMention({embeds: [global]});
};

