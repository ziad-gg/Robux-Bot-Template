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
  const roblox = controller.getData('roblox')
  const client = controller.client;
  const command = controller[0]?.toLowerCase();
  const embed = new EmbedBuilder().setColor('#0be881');

  if (command && command !== 'help') {
    
    let cmd = client.Application.getCommand(command) || client.Application.getCommandByCut(command);
    if (!cmd || (!controller.author.isOwner && cmd.category === 'admins') || cmd.isSubCommand) return controller.replyNoMention({ content: '❌ **هذا الأمر غير موجود!**' });
    
    embed.setTitle(`Command: ${cmd.name}`); 
    
    const SubCommands = cmd.SubCommands;
    
    const GroupName = controller[1]?.toLowerCase();
    const GroupChildName = controller[2]?.toLowerCase();
      
    let subs;
    let main;
    
    if (GroupName || GroupChildName) {
      subs = SubCommands?.find(sub => sub.commandGroup?.toLowerCase() === GroupName && (GroupChildName ? sub.commandName === GroupChildName : true));
      if (!subs) subs = SubCommands.find(op => op.commandName.toLowerCase() === GroupName && !op.commandGroup);
      if (!subs) return controller.replyNoMention({ content: '❌ **هذا الأمر غير موجود!**' });
    }
    
    if (subs) {
      main = cmd;
      cmd = client.Application.getCommand(subs.commandName);
    }

    const Aliases = cmd.Application.Cuts;
    
    if (cmd.description) embed.setDescription(cmd.description);
    if (Aliases && Aliases.size > 0) embed.addFields({ name: 'Aliases:', value: Aliases.map(e => e.withPrefix ? `${client.Application.prefix}${e.cutName}`: e.cutName).join(' ') })
    if (!main && SubCommands.length > 0) embed.addFields({ name: 'Subs:', value: SubCommands.map(e => `${client.Application.prefix}${cmd.name} ${e.commandGroup ? e.commandGroup : e.commandName } ${e.commandGroup ? e.commandName : ''}`).join('\n') });
    if (cmd.usage) embed.addFields({ name: 'Usages:' , value: cmd.usage.map(e => `${client.Application.prefix}${e.replace(/\{cmdname}/, cmd.name).replace(/\{mainName}/, main?.name).replace(/\{groupname}/, GroupName)}`).join('\n') });
    if (cmd.examples) embed.addFields({ name: 'Exmaples:', value: cmd.examples.map(e => `${client.Application.prefix}${e.replace(/\{cmdname}/, cmd.name).replace(/\{mainName}/, main?.name).replace(/\{groupname}/, GroupName).replace(/\{roleMention}/, `<@&${controller.guild.roles.cache.randomKey()}>`).replace(/\{roleId}/, `${controller.guild.roles.cache.randomKey()}`).replace(/\{channelId}/, `${controller.guild.channels.cache.randomKey()}`).replace(/\{channelMention}/, `<#${controller.guild.channels.cache.randomKey()}>`).replace(/\{snumber}|{lnumber}/, (math) => math.randomNum()).replace(/\{rusername}/, roblox.me.username).replace(/\{userMention}/g, `<@${controller.author.id}>`).replace(/\{userId}/g, `${controller.author.id}`)}`).join('\n') });
    
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