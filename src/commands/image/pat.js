const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (bot, message, args, color) => {
	let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  let {body} = await superagent
	.get(`https://nekos.life/api/pat`);
  
	let neko = new Discord.RichEmbed()
	.setColor(color)
  .setDescription(`${ user ? `<@${message.author.id}> pats <@${user.id}>` : `There there, I will pat you <@${message.author.id}>`}`)
  .setFooter(`Powered by: Nekos.life`)
	.setImage(body.url);
	message.channel.send(neko);
}

exports.conf = {
  aliases: [],
  cooldown: '7'
}

exports.help = {
	name: "pat",
	description: "pat someone",
	usage: 'pat @someone'
}