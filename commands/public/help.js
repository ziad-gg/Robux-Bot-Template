const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { CommandBuilder } = require('handler.djs');

module.exports = new CommandBuilder()
  .setName('help')
  .setDescription('Feeling lost?')
  .setCooldown('10s')
  .setCategory('help')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false).addStringOption((option) => option
     .setName('cmd')
     .setDescription('Shows details about how to use a command')                                                           
     .setRequired(false)))
  .setGlobal(GlobalExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const client = controller.client;
  const command = controller[0]?.toLowerCase();
  const embed = new EmbedBuilder().setColor('#0be881');

  if (command && command !== 'help') {
    const cmd = client.Application.getCommand(command)
    if (!cmd || (!controller.author.isOwner && cmd.category === 'admins') || command.isSubCommand) return controller.replyNoMention({ content: `❌ **لا يمكن العثور على هذا الأمر!**` });
    
    const Aliases = cmd.Application.Cuts;
    const SubCommands = cmd.SubCommands;
    
    if (cmd.description) embed.setDescription(cmd.description);
    if (Aliases && Aliases.size > 0) embed.addFields({name:"**Aliases**", value: Aliases.map(e => e.withPrefix?  `${client.Application.prefix}${e.cutName}`: e.cutName ).join(' ') });
    if (cmd.usage) embed.addFields({name:"**Usages**", value: cmd.usage.map(e => `${client.Application.prefix}${e}`).join(`\n`)});
    if (cmd.examples) embed.addFields({name: "**Exmaples**", value: cmd.examples.map(e => `${client.Application.prefix}${e.replace(/\{userMention}/g, `<@${controller.author.id}>`).replace(/\{userId}/g, `${controller.author.id}`)}`).join(`\n`)});
    
    embed.setTitle(`Command: ${cmd.name}`); 
    embed.setDescription(cmd.description);
    
    
  } else {
    const commands = [];

    client.Application.commands.filter(e => e.category !== 'help').forEach(cmd => {
      if (!cmd.isSubCommand) commands.push({ name: `\`${cmd.name}\``, category: cmd.category });
    });

    const general = commands.filter(cmd => cmd.category === 'public').map(cmd => cmd.name);
    const admins = commands.filter(cmd => cmd.category === 'admins').map(cmd => cmd.name);

    embed.setTitle(`قائمة أوامر ${controller.guild.name}`);
    embed.setDescription(`**للحصول على معلومات أكثر حول أمر معين ، اكتب : ${client.Application.prefix}help <command name>**`)
    embed.setThumbnail(controller.guild.iconURL())

    if (general.length) embed.addFields([{ name: 'General Commands', value: general.join(', ') }]);
    if (admins.length && controller.author.isOwner) embed.addFields([{ name: 'Admins Commands', value: admins.join(', ') }]);
  };
  
  controller.replyNoMention({ embeds: [embed] });
};