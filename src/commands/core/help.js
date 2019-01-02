const { RichEmbed } = require("discord.js");
const config = require("../../config.json");
const pkg = require("../../../package.json");

exports.run = async (client, msg, args, color) => {
    if (!args[0]) {
        let category = Array.from(new Set(client.commands.map(x => x.help.category)));
        let embed = new RichEmbed()
        .setColor(color)
        .setAuthor(client.user.username + ' Help', client.user.displayAvatarURL)
        .setFooter(`Untuk melihat penggunaan perintah, ketik \`${config.bot_prefix}help <command>\` // Total: ${client.commands.size}`)
        for (const cat of category) {
            embed.addField(client.util.toPlural(cat), client.commands.filter(x => x.help.category === cat && !x.conf.owner).map(x => `\`${x.help.name}\``).join(' '));
        }
        return msg.channel.send(embed);
    } else {
        let cmd = args[0];
        if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (command.conf.owner) return msg.channel.send(`Maaf **${msg.author.username}**, aku tidak bisa mencari perintah \`${cmd}\` yang kamu maksudkan.`);
            let name = config.bot_prefix + command.help.name;
            let desc = command.help.description;
            let aliases = command.conf.aliases;
            let usage = config.bot_prefix + command.help.usage;

            let embed = new RichEmbed()
            .setAuthor(client.user.username + ' Help Description', client.user.displayAvatarURL)
            .setTitle(aliases[0] ? `${name} ❱ ${config.bot_prefix}${aliases.join(` ❱ ${config.bot_prefix}`)}` : name)
            .setDescription(desc)
            .setColor(color)
            .addField('Usage', usage);
            return msg.channel.send(embed);
        }
        if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
            msg.channel.send(`Maaf **${msg.author.username}**, aku tidak bisa mencari perintah \`${cmd}\` yang kamu maksudkan.`);
        }
    }
}

exports.conf = {
    aliases: ['h'],
}

exports.help = {
    name: 'help',
    description: 'Menampilkan daftar perintah. Tambahkan nama perintah untuk melihat informasi perintah',
    usage: 'help ' + config.prefix + 'help ping'
}
