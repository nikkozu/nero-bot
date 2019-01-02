const Discord = require('discord.js');
const { Canvas } = require("canvas-constructor");

exports.run = async (client, msg, args) => {
    const randomColor = '#'+Math.random().toString(16).slice(-6);

    let color = new Canvas(80, 80)
    .setColor(randomColor)
    .addRect(0,0,300,300)

    let randcolor = new Discord.RichEmbed()
    .setColor(randomColor)
    .attachFile({attachment: color.toBuffer(), name: 'color.png'})
    .setThumbnail('attachment://color.png')
    .addField('Hex', randomColor.toUpperCase())
    .addField('RGB', `${client.util.hexToRgb(randomColor).r}, ${client.util.hexToRgb(randomColor).g}, ${client.util.hexToRgb(randomColor).b}`)
    return msg.channel.send(randcolor);
}

exports.conf = {
    aliases: [],
    cooldown: '15'
}

exports.help = {
    name: 'randomcolor',
    description: 'give you random color with hex',
    usage: "randomcolor"
}