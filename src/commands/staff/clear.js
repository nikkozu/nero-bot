exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author.username}**, Sorry you can't use this command!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author.username}**, I don't have the \`MANAGE_MESSAGES\` permissions.`).then(msg=>msg.delete(5000));

    if (args[0] > 100) return message.channel.send(`**${message.author.username}**, You only can delete up **100** messages.`)
    let count = parseInt(args[0]) || 1;
    await message.delete();

    message.channel.fetchMessages({ limit: Math.min(count, 100) })
    .then(msg => {
        if (msg.size < 1) return message.channel.send(`I can't find the message to delete.`).then(msg=>msg.delete(5000));
        message.channel.bulkDelete(msg);
        message.channel.send(`Success deleted messages ${msg.size}/${count}`).then(msg=>msg.delete(4500));
    }).catch(err => {
        console.log(err);
    });
}

exports.conf = {
    aliases: ['purge']
}

exports.help = {
    name: "clear",
    description: "Menghapus pesan yang tidak kamu inginkan",
    usage: "clear 10"
}