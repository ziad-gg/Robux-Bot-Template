const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, roleMention } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('info')
  .setDescription('Get All dara.')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .OwnersOnly()


async function GlobalExecute(message, interaction, global) {
    const controller = message ?? interaction;
    const Guilds = controller.getData('guilds');
    const Guild = await Guilds.get(message.guild.id);

    const embed = new EmbedBuilder()
      .setColor('#0be881')
      .setAuthor({ name: controller.author.username, iconURL: controller.author.avatarURL() })
      .setThumbnail(controller.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `${controller.guild.name} info` });

    Guild.recipient ? embed.addFields({ name: 'مستلم الارباح', value: `<@${Guild.recipient}>` }) : null;
    Guild.price ? embed.addFields({ name: 'سعر الروبوكس', value: "```"+`${Guild.price}`+"```" }) : null;
    Guild.groupId ? embed.addFields({ name: 'اي دي الجروب', value: "```"+`${Guild.groupId}`+"```" }) : null;
    Guild.transfer.max ? embed.addFields({ name: 'الحد الاقصي للتحويل فقط', value: "```"+`${Guild.transfer.max}`+"```" }) : null;
    Guild.transfer.min ? embed.addFields({ name: 'الحد الادني للتحويل فقط', value: "```"+`${Guild.transfer.min}`+"```" }) : null;
    Guild.buy.max ? embed.addFields({ name: 'الحد الاقصي للشراء فقط', value: "```"+`${Guild.buy.max}`+"```" }) : null;
    Guild.buy.min ? embed.addFields({ name: 'الحد الادني للشراء فقط', value: "```"+`${Guild.buy.min}`+"```" }) : null;

    embed.setDescription(`
     **روم الاثباتات** \n\ <#${Guild.proofsChannel? Guild.proofsChannel : "لم يتم تسجيله بعد"}> 
     \n\ **روم الشكر**  \n\ <#${Guild.thxChannel? Guild.thxChannel : "لم يتم تسجيله بعد"}> \n\ 
     **روم اللوج**  \n\ <#${Guild.logsChannel? Guild.logsChannel : "لم يتم تسجيله بعد"}> \n\ 
     **رول  العميل**  \n\ ${controller.guild.roles.cache.get(Guild.clientsRole || "1") ? roleMention(Guild.clientsRole) : "لم يتم تسجيلها بعد"}
    `);

    controller.replyNoMention({ embeds: [embed] });
};