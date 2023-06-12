const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { CommandBuilder } = require("handler.djs");

module.exports = new CommandBuilder()
.setName('help')
.setDescription('Get all Commands or Command Details')
.setCooldown('10s')
.setCategory('help')
.InteractionOn(new SlashCommandBuilder().addStringOption((op) => op
 .setName('cmd')
 .setDescription('Command name to get'))
)
// .setGlobal(GlobalExecute)
.setInteractionExecution(InteractionExecute)
.setMessageExecution(MessageExecute);

// function GlobalExecute() {}

function InteractionExecute() {}

async function MessageExecute(message) {
  const client = message.client;
  const command = message[0]?.toLowerCase();

  let embed = new EmbedBuilder()
    .setColor('#0be881');

  if (command) {
    
  } else {
    const commands = [];
    const fields = [];

    client.Application.commands.filter(e => e.category != 'help' || e.category != 'util' || !e.Application.isSub).forEach(cmd => {
      commands.push({ name: `\`${cmd.name}\``, category: cmd.category });
    });

    const general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
    const admins = commands.filter(cmd => cmd.category == 'admins').map(cmd => cmd.name);

    embed.setTitle(`قائمة أوامر ${message.guild.name}`);
    embed.setDescription(`**للحصول على معلومات أكثر حول أمر معين ، اكتب : ${client.Application.prefix}help <command name>**`)
    embed.setThumbnail(message.guild.iconURL())

    if (general.length) fields.push({ name: '**General Commands**', value: general.join(', ') });
    if (admins.length && message.author.isOwner) fields.push({ name: '**Admins**', value: admins.join(', ') });
  };
  message.replyNoMention({ embeds: [embed] });
}