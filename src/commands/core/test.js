const Discord = require("discord.js");
const jimp = require("jimp");

exports.run = async (client, msg, args) => {
  
  msg.mentions.members.map()
  class Captcha {
    /**
     * @param {string} captcha - The captcha (pass null and call generate method if it shall be random)
     * @param {object} author - The author object (Has to has an id property and should look like <@123456789>)
     * @param {buffer} image buffer - Initialize object with an already existing image buffer
     */
    constructor(captcha, author, buff) {
        this._captcha = captcha;
    }

    /**
     * @returns {string} Captcha value of class
     */
    generate() {
        let rand = Math.random().toString(36).substr(2, 6);
        this.captcha = rand;
        return this.captcha;
    }

    get captcha() {
        return this._captcha;
    }

    set captcha(value) {
        this._captcha = value;
    }
  }
  
//   // let captchaInstance = new Captcha(null, msg.author);
//   // let captcha = captchaInstance.generate();
//   // let _image = await jimp.read("https://i.imgur.com/mkoc2Fh.png");
//   // let _font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
//   // let _coordinates = [Math.random() * 400, Math.random() * 400]; // x & y coordinates for text on image
//   // _image.resize(750, 750); // make bigger
//   // _image.print(_font, _coordinates[0], _coordinates[1], captcha); // print captcha on image
//   // msg.author.send(new Discord.RichEmbed()
//   //     .setTitle("Verification")
//   //     .setDescription("This guild is protected by discordcaptcha, an open-source verification bot made by AkizukiMasami#9363")
//   //     .addField("Instructions", `In a few seconds an image will be sent to you which includes a number. Please send ,verify <captcha> into the channel ${msg.channel.name} (${msg.channel})`)
//   //     .setColor("RANDOM")
//   //     .setTimestamp()
//   // ).catch(e => e.toString().includes("Cannot send messages to this user") ? msg.reply("please turn on dms") : null);
//   // _image.getBuffer(jimp.MIME_PNG, (err, buff) => {
//   //     msg.author.send(new Discord.Attachment(buff, "captcha.png"));
//   // });
//   // msg.channel.awaitMessages(msg => msg.content === ",verify " + captchaInstance.captcha && msg.author === msg.author, {
//   //                       max: 1,
//   //                       errors: ["time"]
//   // }).then(() => {
//   //     msg.author.send({
//   //         embed: {
//   //             color: 0x00ff00,
//   //             description: "Successfully verified on `" + msg.guild.name + "`"
//   //         }
//   //     });
//   //   let logChannel = client.channels.get('468753797645336596');
//   //   if (logChannel && logChannel.type === "text") logChannel.send(`${msg.author.toString()} was successfully verified.`);
//   // }).catch(console.log);
  
//   var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
//   'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
//   '0','1','2','3','4','5','6','7','8','9');
//   var i;
//   for (i=0;i<6;i++){
//     var a = alpha[Math.floor(Math.random() * alpha.length)];
//     var b = alpha[Math.floor(Math.random() * alpha.length)];
//     var c = alpha[Math.floor(Math.random() * alpha.length)];
//     var d = alpha[Math.floor(Math.random() * alpha.length)];
//     var e = alpha[Math.floor(Math.random() * alpha.length)];
//   }
//   const res = a + b + c + d + e;
//   msg.channel.send(`Please retype this = \`${res}\``)
//   try {
//     const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, errors: ["time"] });
//     // console.log(response.first().content);
//     if (response.first().content == res) {
//       msg.channel.send('Nice type ' + msg.author)
//     } else {
//       msg.channel.send('Wrong')
//     }
//   } catch(e) {
//     console.log(e.message)
//   }
}

exports.conf = {
  aliases: [],
  owner: true
}

exports.help = {
  name: 'test'
}