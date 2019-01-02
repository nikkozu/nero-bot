const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, eColor) => {
    // avatar member
    if (!args[0]) {
        let final = message.member;
        let embed = new RichEmbed()
        .setColor(eColor)
        .setImage(final.user.displayAvatarURL)
        .setAuthor(final.user.tag)
        .setDescription(`[Avatar URL](${final.user.displayAvatarURL})`)
        return message.channel.send(embed);
    } else if (args[0] === 'server') {
        let embed = new RichEmbed()
        .setColor(eColor)
        .setImage(message.guild.iconURL + '?size=2048')
        .setAuthor(message.guild.name)
        .setDescription(`[Avatar URL](${message.guild.iconURL}?size=2048)`)
        return message.channel.send(embed);
    } else {
        let memArray = message.mentions.members.array();
        if(!memArray.length) memArray = args.map(x => message.guild.members.get(x));
        if (memArray.length > 4) return message.channel.send('bubu');
        return memArray.forEach(x => {
            let embed = new RichEmbed()
            .setColor(eColor)
            .setImage(x.user.avatarURL)
            .setAuthor(x.user.tag)
            .setDescription(`[Avatar URL](${x.user.avatarURL})`)
            message.channel.send(embed);
        });
    }
}

exports.conf = {
    aliases: ['av', 'ava'],
    cooldown: '7'
}

exports.help = {
    name: "avatar",
    description: "Menampilkan avatar user",
    usage: "avatar @mention"
}