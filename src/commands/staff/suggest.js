const Discord = require("discord.js");

exports.run  = async (bot, msg, args, color) => {
  if (msg.guild.id != `400567670522642442`) return;
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
	let desc = args.join(' ');
  let channel = msg.guild.channels.get('512814102951886863');
	let sender = msg.member;
	if (desc) {
		let embed = new Discord.RichEmbed()
		.setAuthor(`${sender.user.tag}`, sender.user.displayAvatarURL)
		.setTitle("Suggestion")
		.setDescription(desc)
    .setColor(color)
		.setTimestamp()
		channel.send(embed).then(msg => {
      msg.react("467935779801399316").then(r => {
        msg.react("467935780451647488")
      });
    });
	} else {
		msg.channel.send("Niat gak?")
	}
	msg.delete().catch(O_o=>{});
}

exports.conf = {
  aliases: [],
  cooldown: '10'
}

exports.help = {
	name: "suggest",
  description: 'Make suggest with embed',
  usage: 'suggest <Your text here>'
}