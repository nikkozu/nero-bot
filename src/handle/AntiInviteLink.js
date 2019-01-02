const { RichEmbed } = require('discord.js');
const { embed_color } = require('../config.json');

module.exports = async msg => {
    if (msg.guild.id !== '400567670522642442') return;
    const invitelink = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.exec(msg.cleanContent);

    if (invitelink != null) {
        if (msg.member.hasPermission('MANAGE_MESSAGES')) return;
        if (msg.channel.id === '422322594050473985') return;
        msg.delete().then(msgs => {
            msg.reply(`Kamu bisa mempromosikan server kamu di <#422322594050473985>`).then(msg=>msg.delete(10000));
        }).catch()
        let embed = new RichEmbed()
        .setAuthor(msg.author.tag, msg.author.displayavatarURL)
        .setDescription(`Message sent by <@${msg.author.id}> deleted in ${msg.channel}`)
        .addField('Reason', 'Invite Link')
        .setColor(embed_color)
        .setFooter(`ID: ${msg.author.id}`)
        .setTimestamp()
        let chan = msg.guild.channels.get('414694945132380170');
        if (!chan) return;
        chan.send(embed);
        return
    }
}