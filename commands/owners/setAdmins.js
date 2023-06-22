const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

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
  
  const embed = new EmbedBuilder().setDescription("> **قم بتحديد **")
  const options = controller.Application.commands.map(mapCommmands).filter(op => op?.data);
  
  const select = new StringSelectMenuBuilder()
		.setCustomId('starter')
		.setPlaceholder('Make a selection!')
    .setMinValues(1)
  	.setMaxValues(options.length);

	
  await options.forEach(op => {    
    if (op) select.addOptions(op); 
  });
  
  const row = new ActionRowBuilder()
		.addComponents(select);
  
  controller.replyNoMention({ components: [row] })
}

async function InteractionExecute(interaction, global) {};
async function MessageExecute(message, Global) {};

function mapCommmands (cmd) {
   if (cmd.category === 'admins') return new StringSelectMenuOptionBuilder().setLabel(cmd.name).setDescription(cmd.description).setValue(cmd.name).setDefault(true)
}