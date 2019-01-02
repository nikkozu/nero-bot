const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');
const path = require("path");

exports.run = async (client, msg, args) => {
	let user = msg.mentions.members.first() || msg.member;
	try{
		// const paintMess = await msg.channel.send('🖌️ Painting...');
		const plate = await readFile(path.join(__dirname, '..', '..', '..', 'assets', 'image', 'image_respects.png'));
		const png = user.user.avatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=(.+)/g, '.png?size=128');
		const { body } = await client.snek.get(png);
		const giveRespect = new Canvas(720, 405)
		.addRect(0, 0, 720, 405)
		.setColor('#000000')
		.addImage(body, 110, 45, 90, 90)
		.addImage(plate, 0, 0, 720, 405)
		.toBuffer();
		// await paintMess.delete();
		return msg.channel.send(new Attachment(giveRespect, 'paid-respects.png'))
		.then(x => x.react('🇫'));
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.conf = {
  aliases: ['pressf', 'rip', 'ripme']
}

exports.help = {
  name: 'respect',
  description: 'Pay respects to someone.',
  usage: 'respect [@user | id ]',
}