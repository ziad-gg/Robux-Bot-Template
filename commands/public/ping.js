const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName('ping')
  .setDescription('Test the bots response time.')
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  let now = Date.now();
  const controller = message ?? interaction;
  const msg = await controller.replyNoMention({ content: '**🏓 Pong...**' });
  now = Date.now() - now;
  const embed = new EmbedBuilder()
    .setColor(0x0068ff)
    .setDescription(`**⏰ Discord API: ${controller.client.ws.ping}ms\n📊 Time Taken: ${now}ms**`)
    .setTimestamp()
  
  return {
    message: { msg, embed }, 
    interaction: embed
  };
}

async function InteractionExecute(interaction, Global) {
  const global = await Global;
  const embed = global.interaction;
  interaction.editReply({ content: '', embeds: [global.interaction] });
};

async function MessageExecute(message, Global) {
  const global = await Global;
  const data = global.message;
  data.msg.edit({ content: '', embeds: [data.embed] });
};