const pkg = require("../../package.json");

module.exports = client => {
    const catLength = Array.from(new Set(client.commands.map(x => x.help.category))).length;
    const cmdSize = client.commands.size;
    const version = pkg.version;

    // client ready log
    console.log(`Found ${catLength} categories...`);
    console.log(`Found ${cmdSize} commands...`);
    console.log(`${client.user.username} Preparing to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds...`);
    
    // random presence status
    function randomStatus() {
        const status = ["Welcome to CreamPay Server", `with ${client.users.size} member.`, `,help | ${client.channels.size} channels.`, "I'm CreamPay Servant", `CreamPay Bot v${version}`];
        const playing = ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'];
        const sRandom = Math.floor(Math.random() * status.length);
        const pRandom = Math.floor(Math.random() * playing.length);
        client.user.setActivity(status[sRandom], { type: playing[pRandom] });
    }; setInterval(randomStatus, 180000);

    // client success online
    console.log(`${client.user.username} Success boting and online!`);
  
    client.setInterval(() => {
  	  for(const guild of client.guilds.array()){
	  	  const channel = guild.channels.filter(x => x.name === 'bot-spam').first();
	  	  if(!channel) continue;
		  client.commands.get('neko').getNeko(channel, 'Hourly Neko present!!!');
  	  }
    }, 3.6e+6);
}