const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (bot, message, args, color) => {
	let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  let {body} = await superagent
	.get(`https://nekos.life/api/kiss`);
  
	let neko = new Discord.RichEmbed()
	.setColor(color)
  .setDescription(`${ user ? `<@${message.author.id}> kiss <@${user.id}> aahhhh` : `kiss your self ? okay i will kiss you <@${message.author.id}>`}`)
  .setFooter(`Powered by: Nekos.life`)
	.setImage(body.url);
	message.channel.send(neko);
}

exports.conf = {
  aliases: [],
  cooldown: '7'
}

exports.help = {
	name: "kiss",
	description: "kiss someone",
	usage: 'kiss @mention'
}