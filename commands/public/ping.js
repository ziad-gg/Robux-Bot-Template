const { CommandBuilder } = require('handler.djs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = new CommandBuilder() 
  .setName("ping")
  .setDescription("Shows bot ping.")
  .setCategory("public")
  .setCooldown('10s')
  .InteractionOn(new SlashCommandBuilder())
  .setGlobal(GlobalExecute)
  .setInteractionExecution(InteractionExecute)
  .setMessageExecution(MessageExecute)

async function GlobalExecute(message, interaction) {
  const controller = message ?? interaction;
  const msg = await controller.replyNoMention({ content: '**🏓 Pong...**' });
  const embed = new EmbedBuilder()
    .setColor(0x0068ff)
    .setDescription(`**⏰ Discord API: ${message.client.ws.ping}ms\n📊 Time Taken: ${msg.createdTimestamp - message.createdTimestamp}ms**`)
    .setTimestamp()
  
  return {
    message: embed,
    interaction: embed
  };
};

function InteractionExecute(interaction, global) {
  interaction.editReply({ embeds: [global] });
};

function MessageExecute(message, global) {
  console.log(message);
  message.edit({ embeds: [global] });
};