const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Zoblox } = require('zoblox.js');

module.exports = new CommandBuilder() 
.setName('setcookie')
.setDescription('Set Main Roblox Cookie.')
.setCategory('admins')
.InteractionOn(new SlashCommandBuilder().addStringOption(option => option.setName('cookie').setDescription('the cookie to set').setRequired(true)))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) { 

  const controller = message ?? interaction;
  const Guilds = controller.getData('guilds'); 
  const cookies = controller.getData('cookies');
  const Guild = await Guilds.get(controller.guild.id);
  const roblox = new Zoblox();
  
  const cookie = controller[0];
  
  if (!cookie) return controller.replyNoMention({ content: "الرجاء ادخالي كوكي للتسجيل" });
  
  const LoggedData = await roblox.login(cookie).then((me) => me).catch(e => null);
  if (!LoggedData) return controller.replyNoMention({ content: "الرجاء ادخال كوكي صحيح للتسجيل" });
  
  await cookies.set(controller.guild.id, roblox);
  Guild.cookie = cookie;
  await Guild.save();
  
  return {
    message: "**✅ تم تحديد الكوكيز بنجاح!**",
    interaction: "**✅ تم تحديد الكوكيز بنجاح!**",
  }
};

function InteractionExecute(interaction, global) {
  interaction.reply({content: global});
};

function MessageExecute(message, global) {
  message.replyNoMention({content: global});
};

