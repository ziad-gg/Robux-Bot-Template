const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('admins')
  .setDescription('Add a new Admin.')
  .InteractionOn(new SlashCommandBuilder().addUserOption((option) => option
     .setName('admin')
     .setDescription('Admin Profile to Add')
     .setRequired(true)))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)
  .isSubCommand()

async function GlobalExecute(message, interaction, global) {
  
  const controller = message ?? interaction;
  const guildData = await global;
  const userId = controller[0]?.toId();
  // if (!userId) return
  
  const user = await controller.getUser(userId).then(u => u?.user?.id? u.user : u);
  const isAdmin = guildData.admins.find(admin => admin.id = user.id);
  if (isAdmin) return controller.replyNoMention('❌ **هذا المستخدم مضاف بالفعل!**');
  const embed = new EmbedBuilder().setAuthor({ name: controller.author.username, iconURL: controller.author.avatarURL() })

  embed.setTitle(`الاوامر الذ يستطيع التحكم بها`);
  
  const commands = [];

  await controller.client.Application.commands.filter(cmd => cmd.category == 'admins').forEach((value, key) => {
    commands.push(key);
  })
  
  embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط");

  const confirm = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Confirm')
    .setStyle(ButtonStyle.Danger);

	const cancel = new ButtonBuilder()
    .setCustomId('cancel')
    .setLabel('Cancel')
    .setStyle(ButtonStyle.Secondary);
  
  const row = new ActionRowBuilder()
    .addComponents(confirm, cancel);
  
  const m = await controller.replyNoMention({ embeds: [embed], components: [row] }); 
  
  const collectorFilter = m => commands.includes(m.content.toLowerCase()) && m.author.id == controller.author.id;
  const collector = controller.channel.createMessageCollector({ filter: collectorFilter, time: 500000 });

  collector.on('collect', m => {
    console.log(m.content)
    const index = commands.indexOf(m.content.toLowerCase());
    if (commands.length === 1) return;
    commands.splice(index, 1);
    embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط");
    m.edit(embed).catch(e => {});
  });
  
  
}

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};