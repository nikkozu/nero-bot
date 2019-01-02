exports.run = async (client, message, args) => {
    let start = Date.now(); message.channel.send("🏓 | Pong!").then(msg => {
        msg.delete();
        let diff = (Date.now() - start).toLocaleString();
        message.channel.send(`🏓 | Pong! **${message.author.username}** - Time taken: **${diff}ms**`);
    });
}

exports.conf = {
    aliases: [],
    cooldowns: '3'
}

exports.help = {
    name: "ping",
    description: "check bot latency",
    usage: "ping"
}