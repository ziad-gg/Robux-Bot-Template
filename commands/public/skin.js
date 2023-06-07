
const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
.setName("skin")
.setDescription("To get your roblox skin")
.setCategory("public")
.InteractionOn(new SlashCommandBuilder().addStringOption(option => option.setName('username').setDescription('please write player username here')))
.setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute)

async function GlobalExecute (message, interaction) {
  
  const roblox = message.getData('roblox');
  const username = message ? message[0] : interaction['username'];
  
  let user = await roblox.users.find({ userNames: username });
  if (!user) return message.replyNoMention({content: '**لم يتم العثور على هذا الاسم في روبلوكس، قم بالمحاولة مرة اخرى**'});
  user = await roblox.users.get(user.id);

  return {
    message: user,    
    interaction: user
  };
  
}

async function InteractionExecute(interaction, global) {
  const user = global;
  
  const embed = new EmbedBuilder()
  .setAuthor({ name: user.naem, iconURL: user.avatarURL() })
  .setColor('green')
  .setImage(user.avatarURL())
  .setFooter({ Text: interaction.author.username, iconURL: interaction.author.avatarURL() })
  .setTimestamp();
   
  interaction.replyNoMention({ embeds: [embed] });
};

async function MessageExecute(message, global) {
//   const roblox = message.getData('roblox');
//   let user = await roblox.users.find({ userNames: message[0] });
  
//   if (!user) return message.replyNoMention({content: '**لم يتم العثور على هذا الاسم في روبلوكس، قم بالمحاولة مرة اخرى**'});
  
//   user = await roblox.users.get(user.id);
  
  const user = global;
  
  // return console.log(user)
  
  const embed = new EmbedBuilder()
  .setAuthor({ name: user.name, iconURL: user.avatarURL() })
  .setTitle(user.
  .setImage(user.avatarURL())
  .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
  .setTimestamp();
   
  message.replyNoMention({ embeds: [embed] });
};

