const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, member) => {
    if (member.guild.id != `400567670522642442`) return;
    // voice channel
    let guild = member.guild;
    let total = guild.memberCount.toLocaleString();
    let verify = guild.roles.get('403571291703083008').members.size.toLocaleString();
    let totalCh = guild.channels.get('428208195731849236');
    let verifyCh = guild.channels.get('479673938180440066');
    let botCh = guild.channels.get('512862325963882506');
    let userCh = guild.channels.get('442676915304923146');
    if (!totalCh || !verifyCh || !botCh || !userCh) return;

    totalCh.setName(`Members : ${total}`);
    userCh.setName(`Users : ${guild.members.filter(m => !m.user.bot).size.toLocaleString()}`);
    verifyCh.setName(`Verified : ${verify}`);
    botCh.setName(`Bots : ${guild.members.filter(m => m.user.bot).size.toLocaleString()}`);

    //send to channel
    let embed1 = new RichEmbed()
    .setAuthor(`${member.user.tag} leave ${member.guild.name}`, member.user.displayAvatarURL)
    .setDescription(`ID: ${member.user.id}\n<:remMember:480366874455179265>Member Leave (${total})`)
    .setFooter('User joined ' + moment(new Date()).diff(member.joinedAt, 'days') + ' days ago')
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('#ff5b5b')
    .setTimestamp();
    let greetmsg = member.guild.channels.get('400571256425938954');
    if (!greetmsg) return;
    greetmsg.send(embed1);
}