const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName("skin")
.setDescription("To get your roblox skin")
.setCategory("public")
.InteractionOn(new SlashCommandBuilder().addStringOption(option => option.setName('username').setDescription('please write player username here').setRequired(true)))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute (message, interaction) {
  
  const roblox = message ? message.getData('roblox') : interaction.getData('roblox');
  const username = message ? message[0] : interaction['username'];
  
  const m = message ?? interaction;
  
  let user = await roblox.users.find({ userNames: username });
  if (!user) return message.replyNoMention({content: '**لم يتم العثور على هذا الاسم في روبلوكس، قم بالمحاولة مرة اخرى**'});
  user = await roblox.users.get(user.id);

  const embed = new EmbedBuilder()
  .setAuthor({ name: user.name, iconURL: user.avatarURL() })
  .setTitle(user.name)
  .setURL('https://www.roblox.com/users' + user.id)
  .setImage(user.avatarURL())
  .setFooter({ text: m.author.username, iconURL: m.author.avatarURL() })
  .setTimestamp();
  
  return {
    message: embed,    
    interaction: embed
  };
  
}

function InteractionExecute(interaction, global) {
  interaction.replyNoMention({ embeds: [global] });
};

function MessageExecute(message, global) {   
  message.replyNoMention({ embeds: [global] });
};

