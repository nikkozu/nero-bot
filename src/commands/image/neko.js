const Discord = require("discord.js");
const superagent = require("superagent");
const { embed_color } = require("../../config.json");

exports.run = async (bot, message, args, color) => {
	let {body} = await superagent
	.get(`https://nekos.life/api/neko`);
	let neko = new Discord.RichEmbed()
	.setColor(color)
  .setFooter(`Requested By ${message.author.tag}`)
	.setImage(body.neko);

	message.channel.send(neko);
}

exports.getNeko = async (channel, extend = '') => {
  let {body} = await superagent
	.get(`https://nekos.life/api/neko`);
	let neko = new Discord.RichEmbed()
	.setColor(embed_color)
	.setImage(body.neko);
	return channel.send(extend, {embed: neko});
}

exports.conf = {
  aliases: [],
  cooldown: '5'
}

exports.help = {
	name: "neko",
	description: "Get random anime neko image",
	usage: `neko`
}