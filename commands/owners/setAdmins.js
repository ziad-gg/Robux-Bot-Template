const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

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
  
  let time = 500000
  let commands = [];

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
  
  const msg = await controller.replyNoMention({ embeds: [embed], components: [row] }); 
  
  const ButtonCollector = controller.createMessageComponentCollector({ componentType: ComponentType.Button, time });
  
  const MessageCollectorFilter = m => commands.includes(m.content.toLowerCase()) && m.author.id == controller.author.id;
  const MessageCollector = controller.channel.createMessageCollector({ filter: MessageCollectorFilter, time });

  MessageCollector.on('collect', m => {
    if (commands.length === 1) return;
    commands = commands.filter(command => command != m.content.toLowerCase());
    embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط");
    msg.edit({embeds: [embed]}).catch(console.log);
  });
  
  MessageCollector.on('end', () => {
    msg.delete().catch(console.log);
    message.delete().catch(console.log);
  });
  

  ButtonCollector.on('collect', i => {
  });


}

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};