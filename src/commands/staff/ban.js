const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sed(`**${message.author.username}**, Maaf kamu tidak bisa menggunakan perintah ini!.`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(`**${message.author.username}**, Maaf aku tidak mempunyai permission \`BAN_MEMBERS\` untuk melakukannya!`).then(msg=>msg.delete(5000));
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`Aku tidak bisa mencari user tersebut!`).then(msg=>msg.delete(5000));
    let reason = args.join(" ").slice(22);
    if (member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**${message.author.username}**, Maaf kamu tidak bisa mem-ban dia!`).then(msg=>msg.delete(5000));
    
    message.guild.member(member).ban(reason);

    try {
        let embed = new RichEmbed()
        .setAuthor('Banned Thanks')
        .setDescription(`Maaf kamu baru saja ter-banned dari ${message.guild.name} dengan ${reason ? `alasan **${reason}**` : 'tanpa alasan'}`)
        .setColor('#ff4f4f')
        member.send(embed);

        message.channel.send(`**${member.user.tag}** baru saja ter-banned thanks dari server ini :ok_hand: dengan ${reason ? `alasan **${reason}**` : 'tanpa alasan'}`);
    } catch(e) {
        console.log(e);
    }
}

exports.conf = {
    aliases: ['banthx'],
    cooldown: '10'
}

exports.help = {
    name: "ban",
    description: "Banned thanks member nakal.",
    usage: "banthx @someone [Reason]"
}