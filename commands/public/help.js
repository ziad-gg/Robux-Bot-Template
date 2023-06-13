const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { CommandBuilder } = require('handler.djs');

module.exports = new CommandBuilder()
  .setName('help')
  .setDescription('Feeling lost?')
  .setCooldown('10s')
  .setCategory('help')
  .InteractionOn(new SlashCommandBuilder().addStringOption((option) => option
     .setName('command')
     .setDescription('Shows details about how to use a command')                                                           
     .setRequired(false)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const client = controller.client;
  const command = controller[0]?.toLowerCase();
  const embed = new EmbedBuilder().setColor('#0be881');

  if (command) {
    
  } else {
    const commands = [];

    client.Application.commands.filter(e => e.category !== 'help' || e.category !== 'util' && !e.Application.isSub).forEach(cmd => {
      commands.push({ name: `\`${cmd.name}\``, category: cmd.category });
    });

    const general = commands.filter(cmd => cmd.category === 'public').map(cmd => cmd.name);
    const admins = commands.filter(cmd => cmd.category === 'admins').map(cmd => cmd.name);

    embed.setTitle(`قائمة أوامر ${controller.guild.name}`);
    embed.setDescription(`**للحصول على معلومات أكثر حول أمر معين ، اكتب : ${client.Application.prefix}help <command name>**`)
    embed.setThumbnail(controller.guild.iconURL())

    if (general.length) embed.addFields([{ name: '**General Commands**', value: general.join(', ') }]);
    if (admins.length && controller.author.isOwner) embed.addFields([{ name: '**Admins**', value: admins.join(', ') }]);
  };
  
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