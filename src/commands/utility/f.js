const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const path = require("path");
const SQL = require('sqlite3').verbose();

exports.run = async (client, msg, args, color) => {
    const database = new SQL.Database(path.join(__dirname, '..', '..', 'databases', 'f-total.db'));
    var db = await database;

    const date = moment(new Date()).format("YYYY-MM-DD");

    db.run("CREATE TABLE IF NOT EXISTS main (date TEXT, total INTEGER)");
    db.get(`SELECT * FROM main WHERE date = "${date}"`, async function (err, rows) {
        if (err) {
            if (err.message === "SQLITE_ERROR: no such table: main") return undefined;
            console.error(err.message)
        }
        try {
            var fTotal = rows.total + 1;
            if (!rows) {
                db.run("INSERT INTO main (date, total) VALUES (?, ?)", [date, 0]);
            } else {
                db.run(`UPDATE main SET total = '${fTotal}' WHERE date = "${date}"`);
            }
        } catch (e) {
            if (e.message === "Cannot read property 'total' of undefined") {
                db.run("INSERT INTO main (date, total) VALUES (?, ?)", [date, 0]);
                fTotal = 0
            } else {
                console.error(e)
            }
        }
        db.all(`SELECT SUM(total) AS total FROM main`, async function (err, rows) {
            if (err) console.log(err);
            const allday = rows[0].total;

            var embed = new Discord.RichEmbed()
                .setAuthor("Press f to pay respect", msg.author.displayAvatarURL)
                .setDescription(`**${msg.author.tag}** Has paid their ${args[0] ? `respects for **${args.join(" ")}**.` : `respects.`}`)
                .setFooter(`${fTotal} Today, ${allday} Total`)
                .setColor(color)
            msg.channel.send(embed)
        });
    });
}

exports.conf = {
  aliases: []
}

exports.help = {
  name: 'f'
}