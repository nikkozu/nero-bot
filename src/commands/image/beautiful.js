const { Canvas } = require('canvas-constructor');
const { get } = require('superagent');

exports.run = async (client, msg, args) => {
    let user = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
    // const m = await msg.channel.send('Processing...');
    msg.channel.startTyping();
    const image = await getBeautiful(client, user.user.avatarURL);
    msg.channel.send({files: [{attachment: image, name: 'beautiful.png'}]}).then(()=>{ msg.channel.stopTyping() });
};

async function getBeautiful(client, avatar){
  const base = await get('https://raw.githubusercontent.com/Soumil07/York-Dev/master/assets/images/plate_beautiful.png');
  const toMeme = avatar.replace(/\.gif.+/g, '.png');
  const { body } = await get(toMeme);
  return new Canvas(634, 675)
  .setColor(client.color)
  .addRect(0, 0, 634, 675)
  .addImage(body, 423, 45, 168, 168)
  .addImage(body, 426, 382, 168, 168)
  .addImage(base.body, 0, 0, 634, 675)
  .toBuffer();
}

exports.conf = {
  aliases: []
}

exports.help = {
  name : "beautiful"
}