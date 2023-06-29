const { CommandBuilder } = require('handler.djs'); 
 const { SlashCommandBuilder, EmbedBuilder, userMention  } = require('discord.js'); 
  
 module.exports = new CommandBuilder()  
   .setName('remove') 
   .setDescription('remove a admins.') 
   .setUsage(['{cmdname} (user)']) 
   .setExample(['{cmdname} {userMention}', '{cmdname} {userId}']) 
   .InteractionOn(new SlashCommandBuilder().addUserOption((option) => option 
      .setName('admin') 
      .setDescription('Admin user to remove') 
      .setRequired(true))) 
   .setGlobal(GlobalExecute) 
   .setInteractionExecution(InteractionExecute) 
   .setMessageExecution(MessageExecute) 
   .isSubCommand() 
  
 async function GlobalExecute(message, interaction, global) { 
   const controller = message ?? interaction; 
   const Guilds = controller.getData('guilds'); 
   const guildData = await global; 
   const userId = controller[0]?.toId(); 
  
   if (!userId) return controller.replyNoMention({ content: '❌ **قم بتحديد اي دي مستخدم**' }); 
  
   const user = await controller.getUser(userId).then(u => u?.user?.id? u.user : u); 
   if (!user || user.bot) return controller.replyNoMention({ content: '❌ ** قم بتحديد اي دي مستخدم صحيح**' }); 
  
   const isAdmin = guildData.admins.find(admin => admin.id === user.id); 
   if (!isAdmin) return controller.replyNoMention('❌ **هذا المستخدم ليس من الادمن!**'); 
  
   await Guilds.updateOne({ id: controller.guild.id }, { $pull: { admins: { id: userId } } } ); 
   await controller.reply({ embeds: [new EmbedBuilder().setDescription(`✅ **You removed ${userMention(userId)} from admins**`)] }); 
 }; 
  
 async function InteractionExecute(interaction, global) {}; 
 async function MessageExecute(message, Global) {};