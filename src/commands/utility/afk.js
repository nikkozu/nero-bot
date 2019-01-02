const path = require("path");
const SQL = require("sqlite3").verbose();

exports.run = async (client, message, args) => {
    
    const database = new SQL.Database(path.join(__dirname, '..', '..', 'databases', 'afk.db'));
    var db = await database;

    const userId = message.author.id;
    const msg = args.join(" ") || 'AFK';
    const date = new Date();

    db.run("CREATE TABLE IF NOT EXISTS afk (userId TEXT, msg TEXT, date INTEGER)");
    db.get(`SELECT * FROM afk WHERE userId = "${userId}"`, async function (err, rows) {
        if (err) {
            if (err.message === "SQLITE_ERROR: no such table: afk") return undefined;
            console.error(err.message);
        }
        if (!rows) {
            db.run("INSERT INTO afk (userId, msg, date) VALUES (?, ?, ?)", [userId, msg, date]);
            message.channel.send(`<@${userId}>, I set you to AFK: ${msg}`);
        } else {
            db.run("INSERT INTO afk (userId, msg, date) VALUES (?, ?, ?)", [userId, msg, date]);
            message.channel.send(`<@${userId}>, I set you to AFK: ${msg}`);
        }
        // try {
        //     db.run("INSERT INTO afk (userId, msg) VALUES (?, ?)", [userId, msg]);
        //     message.channel.send(`I set your AFK: ${msg}`);
        // } catch (e) {
        //     if (e.message === "Cannot read property 'userId' of undefined") {
        //         db.run("INSERT INTO afk (userId, msg) VALUES (?, ?)", [userId, msg]);
        //         message.channel.send(`I set your AFK: ${msg}`);
        //     }
        // }
    });
}

exports.conf = {
    aliases: [],
    cooldown: '7'
}

exports.help = {
    name: 'afk',
    description: 'set afk',
    usage: 'afk <message>'
}