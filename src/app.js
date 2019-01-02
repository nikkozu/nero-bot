const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

// client class
class Nero extends Client {
    constructor (opt) {
        super (opt);

      this.util = require("./handle/util");
      this.snek = require('node-superfetch');
    }
}

// const client
const client = new Nero({
    fetchAllMembers: true
});

// events file handler
for (const event of readdirSync("./src/events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(client, ...args));
}
// module files handler
require("./handle/ModuleHandler")(client);

// client login
client.login(process.env.TOKEN);

process.on("error", e => console.error('[RIKKA ERROR]', e));
process.on("uncaughtExpection", e => console.error("[RIKKA UNCAUGHT EXCEPTION]", e));
process.on("unhandledRejection", e => console.error("[RIKKA UNHANDLED REJECTION]", e));

module.exports = Nero;
