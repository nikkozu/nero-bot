const { Collection } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = client => {
    client.commands = new Collection();
    client.aliases = new Collection();

    // find module in "commands" folder
    for (const module of readdirSync("./src/commands")) {
        // find command in "module" folder
        for (const command of readdirSync(`./src/commands/${module}`).filter(x => x.endsWith('.js'))) {
            const cmd = require(`../commands/${module}/${command}`);
            cmd.help.category = module;
            client.commands.set(cmd.help.name.toLowerCase(), cmd);
            for (const alias of cmd.conf.aliases) {
                client.aliases.set(alias.toLowerCase(), cmd.help.name.toLowerCase());
            }
        }
    }
}