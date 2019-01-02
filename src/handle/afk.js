const path = require("path");
const SQL = require('sqlite3').verbose();

module.exports = async (client, message) => {

    const database = new SQL.Database(path.join(__dirname, '..', 'databases', 'afk.db'));
    var db = await database;

    let mentioned = message.mentions.members.map(x=>x);
    for (const men of mentioned) {
        if (men) {
            let userId = men.user.id;
            db.get(`SELECT * FROM afk WHERE userId = "${userId}"`, async function (err, rows) {
                if (!rows) return;
                if (message.content.includes(`<@${userId}>`) || message.content.includes(`<@!${userId}>`)) {
                    message.channel.send(`**${men.user.tag}** is AFK: ${rows.msg} - ${client.util.diffDur(rows.date)} ago`);
                }
            });
        }
    }

    db.get(`SELECT * FROM afk WHERE userId = "${message.author.id}"`, async function (err, rows) {
        if (!rows) return;
        if (message.author.id === `${rows.userId}`) {
            db.run(`DELETE FROM afk WHERE userId = '${message.author.id}'`);
            message.channel.send(`Welcome back <@${rows.userId}>, I have remove your afk`).then(msg => msg.delete(5000));
        }
    });
    
}