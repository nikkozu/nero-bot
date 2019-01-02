const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sed(`**${message.author.username}**, Maaf kamu tidak bisa menggunakan perintah ini!.`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send(`**${message.author.username}**, Maaf aku tidak mempunyai permission \`KICK_MEMBERS\` untuk melakukannya!`).then(msg=>msg.delete(5000));
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`Aku tidak bisa mencari user tersebut!`).then(msg=>msg.delete(5000));
    let reason = args.join(" ").slice(22);
    if (member.hasPermission("KICK_MEMBERS")) return message.channel.send(`**${message.author.username}**, Maaf kamu tidak bisa mem-kick dia!`).then(msg=>msg.delete(5000));
    
    message.guild.member(member).kick(reason);

    try {
        let embed = new RichEmbed()
        .setAuthor('Kicked Thanks')
        .setDescription(`Maaf kamu baru saja ter-kick dari ${message.guild.name} dengan ${reason ? `alasan **${reason}**` : 'tanpa alasan'}`)
        .setColor('#4fff57')
        member.send(embed);

        message.channel.send(`**${member.user.tag}** baru saja ter-kick thanks dari server ini :ok_hand: dengan ${reason ? `alasan **${reason}**` : 'tanpa alasan'}`);
    } catch(e) {
        console.log(e);
    }
}

exports.conf = {
    aliases: ['kickthx'],
    cooldown: '10'
}

exports.help = {
    name: "kick",
    description: "Kick thanks member nakal.",
    usage: "kickthx @someone [Reason]"
}