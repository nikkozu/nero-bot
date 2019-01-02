module.exports = async (client, msg) => {
  if (msg.member.hasPermission("MANAGE_MESSAGES")) return;
  
  if (msg.content.toLowerCase() === "creampay") {
    msg.delete();
    
    let member = msg.member;
    let role = msg.guild.roles.get("403571291703083008");
    if (!role) return;
    
    if (member.roles.has(role.id)) return;
    else await member.addRole(role.id);
    
    msg.guild.channels.get("400584195354787850").send(`Please welcome **${member.nickname ? member.nickname : member.user.username}**`);
  } else {
    msg.delete();
  }
}