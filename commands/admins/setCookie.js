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

  // const roblox = message.getData('roblox');
  const cookies = message.getData('cookies');
  const roblox = new Zoblox()
  
  
  return {
    message: "**✅ تم تحديد الكوكيز بنجاح!**",
    interaction: "**✅ تم تحديد الكوكيز بنجاح!**",
  }
};

function InteractionExecute(interaction, global) {
};

function MessageExecute(message, global) {   
};

