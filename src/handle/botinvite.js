const { RichEmbed } = require('discord.js');
const color = require('../config.json').embed_color;

module.exports = async (client, msg, args) => {
  
  if (msg.channel.id !== '512773200812179466') return;
  msg.delete();
  let botId = args[0].match(/[0-9]\w+/.exec(msg.cleanContent));
  if (msg.guild.members.has(botId[0])) return msg.channel.send('Bot already in this guild').then(x => x.delete(5000));
  if (!args[1]) return msg.channel.send("Tolong masukkan prefix.").then(msgs=>msgs.delete(5000));
  let botPrefix = args[1].match(/[^\s]+$/, '');
  if (botId != null) {
    if (msg.channel.id == '512773200812179466') {
      // if (!botPrefix) return message.channel.send("Tolong masukkan prefix.").then(msg=>msg.delete(3000));
      client.fetchUser(botId).then(bUser => {
        if (!bUser.bot) return msg.channel.send("User tersebut bukan bot.").then(msgs=>msgs.delete(5000))
        var embed = new RichEmbed()
        .setAuthor(bUser.tag, bUser.avatarURL)
        .setThumbnail(bUser.avatarURL)
        .setColor(color)
        .addField('Bot Name', bUser.username, true)
        .addField('Bot Prefix', botPrefix, true)
        .addField('Owner', `<@${msg.author.id}>`, true)
        .addField('Bot ID', botId, true)
        .setDescription(`Terima kasih sudah mengirimkan bot, bot akan \n[diinvite](https://discordapp.com/oauth2/authorize?client_id=${botId}&scope=bot&permissions=0) dan diuji terlebih dahulu, harap bersabar.`)
        msg.channel.send(embed).then(msg => {
          msg.react("512787537442373644");
        });
        // client.channels.get('474761807534358545').send(`<@${message.author.id}> mengirimkan <@${bUser.id}>\nInvite link: <https://discordapp.com/oauth2/authorize?client_id=${bUser.id}&scope=bot&permissions=0>`)
        msg.author.send(`Terima kasih telah mengirimkan **${bUser.username}**. Kami akan mengetes bot kamu dan kami akan mengabarkan kamu jika bot kamu selesai di tes.`)
      }).catch(e => {
        if (e.message === 'Unknown User') {
          return msg.channel.send(`**${msg.author.username}**, ID yang kamu masukkan tidak valid, silahkan cek dan invite lagi.`).then(msgs=>msgs.delete(5000));
      } else {
        console.error(e)
      }
      });
    }
  }
}