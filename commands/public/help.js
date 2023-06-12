const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");


module.exports = new CommandBuilder()
.setName('help')
.setDescription('Get all Commands or Command Details')
.setCooldown('10s')
.setCategory('help')
.setMessageExecution(Execute);

async function Execute(message) {

    const client = message.client;
    const Color = 'Blue'
    const cmd = message[0]?.toLowerCase();

    let embed = new EmbedBuilder()
    .setFooter({ text: `For more information on a specific command,\nrun ${client.Application.prefix}help (Command)` }) 
    .setColor(Color);

    if (cmd) {
     


    } else {
        let commands = [];
        let fields = [];
      
        client.Application.commands.filter(e => e.category != 'help' || e.category != 'util' ).forEach(cmd => {
          commands.push({ name: `\`${cmd.name}\``, category: cmd.category });
        });
        
        let general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
        // let moderator = commands.filter(cmd => cmd.category == 'admins').map(cmd => cmd.name);
        
        embed.setTitle(`قائمة أوامر ${message.guild.name}`);
        embed.setDescription(`**للحصول على معلومات أكثر حول أمر معين ، اكتب : ${client.Application.prefix}help <command name>**`)
        embed.setThumbnail(message.guild.iconURL())
      
        if (general.length) fields.push({name: '**General Commands**', value: general.join(', ')});
        // if (moderator.length) fields.push({name:'**Admins**', value: moderator.join(', ')});

        embed.data.fields = fields;

    };

    message.replyNoMention({embeds: [embed]})
}