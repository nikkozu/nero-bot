const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, member) => {
    if (member.guild.id != `400567670522642442`) return;
    // send to member
    let icon = member.guild.iconURL;
    let welImage = 'https://cdn.discordapp.com/attachments/420937822560845833/424963452797452289/244tymb_waifu2x_art_noise3_scale_tta_1.png';
    let embed = new RichEmbed()
    .setAuthor('CreamPay Server', icon)
    .setTitle('Information')
    .setURL('https://discord.gg/fpZBKuG')
    .setThumbnail(icon)
    .setImage(welImage)
    .setColor('#FF5E77')
    .setFooter(`© ${member.guild.name} | ${member.guild.owner.user.username}`)
    .setTimestamp()
    .setDescription(`Welcome to **${member.guild.name}** server **${member.user.tag}**, don't forget to read our <#453247842857910313>. Hope you enjoy on **${member.guild.name}**.`)
    .addField('Owner Server', `<@${member.guild.owner.id}>`, true)
    member.send(embed);

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
    .setAuthor(`${member.user.tag} joined ${member.guild.name}`, member.user.displayAvatarURL)
    .setDescription(`ID: ${member.user.id}\n<:addMember:480366874371293226>New Member (${total})`)
    .setFooter('User created ' + moment(new Date()).diff(member.user.createdAt, 'days') + ' days ago')
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('#42f456')
    .setTimestamp();
    let greetmsg = member.guild.channels.get('400571256425938954');
    if (!greetmsg) return;
    greetmsg.send(embed1);

    // ban discord username
    const memberInv = member.user.username.match(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi, '');
    const invite = /\bawait\b/i.test(memberInv) ? `(async function(){ \n${memberInv}\n})()` : memberInv;
    if (!invite) return;
    if (member.user.username === invite[0]) {
      guild.member(member).ban();
    }
}