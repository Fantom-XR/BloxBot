const Discord = require("discord.js");
const settings = require("../settings.json");
const fs = require("fs");

module.exports = async(client, msg, suffix) => {
	const embed1 = new Discord.RichEmbed();
	const embed2 = new Discord.RichEmbed();
	const embed3 = new Discord.RichEmbed();
	let member = msg.mentions.members.first();
	if (!settings.maintainers.includes(msg.author.id)) {
		embed1.setDescription("You don't have permission to use this command! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}
	if (msg.mentions.users.size == 0) {
		embed2.setDescription("You need to mention a user! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed2 });
	}
	embed3.setDescription(`**${member.user.tag}** is now a Premium user. ⭐`)
		.setColor("#00FA9A");
	msg.channel.send({ embed: embed3 });
	settings.premiumUsers.push(`${member.user.id}`);
	// Credit to Mason for this line of code (https://github.com/mas0ngamingHD)
	fs.writeFileSync("settings.json", JSON.stringify(settings));
}
;
