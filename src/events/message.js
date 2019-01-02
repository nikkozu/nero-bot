const config = require("../config.json");
const { Collection } = require("discord.js");
const cooldowns = new Collection();

module.exports = async (client, msg) => {
    if (msg.author.bot || !msg.guild) return;

    const args = msg.content.trim().split(/ +/g);
  
    if (msg.content.toLowerCase() === `<@${client.user.id}>` || msg.content.toLowerCase() === `<@!${client.user.id}>`) {
        let answer = [`Hai **${msg.author.username}**`, `Halo **${msg.author.username}**`, `Apa kabar **${msg.author.username}**?`];
        let result = Math.floor(Math.random() * answer.length);
        msg.channel.send(answer[result]);
    }

    if (msg.content.startsWith(config.bot_prefix.toLowerCase())) return require("../handle/command")(client, msg);
    if ((/(https?:\/\/)?(wwww\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi).test(msg.content)) return require("../handle/AntiInviteLink")(msg);
    if (msg.channel.id === "436409241071386625") return require("../handle/verification")(client, msg);
    // if (/[0-9]\w+/.exec(msg.cleanContent)) return require('../handle/botinvite')(client, msg, args);
    require("../handle/afk")(client, msg);
}