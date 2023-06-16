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

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const client = controller.client;
  const command = controller[0]?.toLowerCase();
  const embed = new EmbedBuilder().setColor('#0be881');

  if (command) {
    const fields = [];
    const cmd = client.Application.getCommand(command)
    if (!cmd || cmd.category == "help" || cmd.category == "dev" || cmd.category == "util") return controller.replyNoMention(`❌ **لا يمكنني العثور علي هذا الامر**`);

      embed.setTitle(`**Command: ${cmd.name}**`); 
      
      if (cmd.description) embed.addField(cmd.description);
      if (command.usage) embed.addField({name: `**Usages:**`, value: command.usage.map(e => `${client.Application.prefix}${e}`).join(`\n`)});
      if (command.examples) fields.push({name: `**Examples:**`, value: command.examples.map(e => `${client.Application.prefix}${e.replace(/\{userMention}/g, `<@${message.author.id}>`).replace(/\{userId}/g, `${message.author.id}`)}`).join(`\n`)});
        
/  } else {
    const commands = [];

    client.Application.commands.filter(e => e.category !== 'help').forEach(cmd => {
      if (!cmd.isSubCommand) commands.push({ name: `\`${cmd.name}\``, category: cmd.category });
    });

    const general = commands.filter(cmd => cmd.category === 'public').map(cmd => cmd.name);
    const admins = commands.filter(cmd => cmd.category === 'admins').map(cmd => cmd.name);

    embed.setTitle(`قائمة أوامر ${controller.guild.name}`);
    embed.setDescription(`**للحصول على معلومات أكثر حول أمر معين ، اكتب : ${client.Application.prefix}help <command name>**`)
    embed.setThumbnail(controller.guild.iconURL())

    if (general.length) embed.addFields([{ name: '**General Commands**', value: general.join(', ') }]);
    if (admins.length && controller.author.isOwner) embed.addFields([{ name: '**Admins**', value: admins.join(', ') }]);
  };
  
  controller.replyNoMention({ embeds: [embed] });
};