exports.run = async (client, msg, args) => {
  if (!msg.member.hasPermission("MANAGE_MESSAGES") && !msg.member.roles.has("508837873504747525")) return;
  msg.delete();
  const role = msg.guild.roles.get('512815913448243221');

  role.setMentionable(true).then(roles=> {
    
    msg.channel.send(`<@&${role.id}>: **__New Giveaway__** :tada:
Kamu telah ter-ping karena kamu memiliki role **Giveaway Ping**. React dengan :tada: untuk ikut bergabung.
:gear: Untuk mengambil atau melepas role **Giveaway Ping** silahkan menuju <#512813985419100171> dan react dengan emoji yang sesuai dengan role.`);
    setInterval(function(){ roles.setMentionable(false); }, 1000);
    
  });
  
}

exports.conf = {
  aliases:['gp']
}

exports.help = {
  name: 'giveawayping',
  description: 'mem-ping role Giveaway Ping setiap giveaway diadakan',
  usage: 'giveawayping'
}