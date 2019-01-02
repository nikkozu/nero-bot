const config = require("../config.json");
const { Collection } = require("discord.js");
const cooldowns = new Collection();

module.exports = async (client, msg) => {
  
    const args = msg.content.slice(config.bot_prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const color = config.embed_color;
  
    require("../handle/afk")(client, msg);
  
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return undefined;
    if (cmd.conf.owner && !config.owners_id.includes(msg.author.id)) return;

    // check cooldown commands
    if (!cooldowns.has(cmd.help.name)) {
        cooldowns.set(cmd.help.name, new Collection());
    }
    var member = msg.member;
    var now = Date.now();
    var timestamps = cooldowns.get(cmd.help.name) || new Collection();
    var cdAmount = cmd.conf.cooldown || 5;
    var userCd = timestamps.get(msg.author.id) || 0;
    var estdTime = userCd + (cdAmount * 1000) - now;
    if (userCd && !config.owners_id.includes(msg.author.id) && estdTime > 0) {
        return msg.channel.send(`**${member.user.username}**, please wait **${estdTime/1000}s** cooldown time.`).then(msg => msg.delete(3000));
    }
    timestamps.set(msg.author.id, now);
    cooldowns.set(cmd.help.name, timestamps);

    // end check cooldown and run the command
    cmd.run (client, msg, args, color);    
}