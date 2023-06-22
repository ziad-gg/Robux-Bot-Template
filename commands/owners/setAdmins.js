const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('admins')
  .setDescription('Add a new Admin.')
  .setCategory('admins')
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
  const embed = new EmbedBuilder()
  
  const commands = [];

  await controller.client.commands.filter(cmd => cmd.category == 'admins').forEach((value, key) => {
    embed.setTitle(`الاوامر الذ يستطيع التحكم بها`);
    commands.push(key)
  });
  
  
  embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط  \n\ `yes` لتاكيد اضافه هذا العضو ك متحكم في هذه الاوامر فقط اكتب \n\ `no` للالغاء");

  controller.replyNoMention({ embeds: [embed] });
  
  
  
}

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};