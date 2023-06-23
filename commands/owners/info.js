const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('info')
  .setDescription('Get All dara.')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .OwnersOnly()


async function GlobalExecute(message, interaction, global) {
    const controller = message ?? interaction;
    const Guilds = controller.getData('guilds');
    const Guild = await Guilds.get(message.guild.id)

    const embed = new EmbedBuilder()
    .setColor('#0be881')
    .setAuthor({ name: controller.author.username, iconsURL: controller.author.avatarURL() })
    .setThumbnail(controller.guild.iconURL())
    .setTimestamp()
    .setFooter(`Database info`);

    Guild.recipient ? embed.addField(`مستلم الارباح`, `<@${Guild.owner}>`) :  embed.addField(`مستلم الارباح`, `<@${message.guild.ownerID}>`)
    Guild.price ? embed.addField(` سعر الروبوكس`, "```"+`${Guild.price}`+"```") :  embed.addField(`سعر الروبوكس`, "```"+`1000`+"```")
    Guild.groupId ? embed.addField(`اي دي الجروب`, "```"+`${Guild.groupId}`+"```") :  embed.addField("اي دي الجروب", "```"+`اي دي الجروب`, `لم تم تسجيله بعد`+"```")
    Guild.limit.transfer ? embed.addField(`الحد الاقصي للتحويل فقط`, "```"+`${Guild.limit.transfer}`+"```") :  embed.addField(`الحد الاقصي للتحويل فقط`, "```"+`5`+"```")
    Guild.limit.buy ? embed.addField(`الحد الاقصي للشراء فقط`, "```"+`${Guild.limit.buy}`+"```") :  embed.addField(`الحد الاقصي للشراء فقط`, "```"+`5`+"```")

    embed.setDescription(`
     **روم الاثباتات** \n\ <#${Guild.proofchannel? Guild.proofchannel : "لم يتم تسجيله بعد"}> 
     \n\ **روم الشكر**  \n\ <#${Guild.thanksChannel? Guild.thanksChannel : "لم يتم تسجيله بعد"}> \n\ 
     **روم اللوج**  \n\ <#${Guild.logsChannel? Guild.logsChannel : "لم يتم تسجيله بعد"}> \n\ 
     **رول  العميل**  \n\ <@&${message.guild.roles.cache.get(Guild.clientRole || "1") ? Guild.clientRole : "لم يتم تسجيلها بعد"}>
    `)

    controller.replyNoMention({ embds: [embed] })
};

/// id: {/ id: {
//     type: String,
//     required: true
//   },
//   prefix: {
//     type: String,
//     default: DEFAULT_PREFIX
//   },
//   groupId: { 
//     type: Number 
//   },
//   recipient: {
//     type: String,
//   },
//   price: { 
//     type: Number, 
//     default: 1000 
//   }, 
//   proofsChannel: { 
//     type: String 
//   },
//   thxChannel: { 
//     type: String 
//   },
//   thxEmoji: {
//     type: String
//   }, 
//   codesChannel: { 
//     type: String 
//   },
//   clientsRole: { 
//     type: String 
//   },
//   schannels: [{ 
//     MessageId: String, 
//     ChannelId: String 
//   }],
//   admins: [{
//     id: String,
//     commands: [String]
//   }],
//   buy: {
//     max: { 
//       type: Number, 
//       default: 0 
//     },
//     min: { 
//       type: Number, 
//       default: 1 
//     },
//     status: {
//       type: Boolean,
//       default: true
//     }
//   },
//   transfer: {
//     max: { 
//       type: Number, 
//       default: 0 
//     },
//     min: { 
//       type: Number, 
//       default: 1 
//     },
//     status: {
//       type: Boolean,
//       default: true
//     }
//   }