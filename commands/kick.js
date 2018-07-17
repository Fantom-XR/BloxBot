const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const embed1 = new Discord.RichEmbed();
	const embed2 = new Discord.RichEmbed();
	const embed3 = new Discord.RichEmbed();
	const embed4 = new Discord.RichEmbed();
	const embed5 = new Discord.RichEmbed();
	const embed6 = new Discord.RichEmbed();
	let member = msg.mentions.members.first();
	let reason = suffix.substring(suffix.indexOf(" ") + 1).trim();
	if (!msg.member.roles.find("name", "Staff")) {
		embed1.setDescription("You don't have permisson to run this command! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}
	if (msg.mentions.users.size == 0) {
		embed2.setDescription("You need to mention a user! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed2 });
	}
	if (reason.length == 0) {
		embed3.setDescription("You need to include a reason!")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed3 });
	}
	embed4.setDescription(`Are you sure you want to kick **${member.user.username}**? 🚦`)
		.setColor("#FFA500");
	/*
		Again, Messaage Collector by Hydrogen (https://github.com/thehydrogen)
	*/
	msg.channel.send({ embed: embed4 }).then(ctx => {
		let collector = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
		collector.on("collect", cmsg => {
			if (cmsg.content.toLowerCase() === "no") {
				embed5.setDescription("Kick cancelled. ❌")
					.setFooter("Please re-run the ?kick command if you change your mind.")
					.setColor("#FF6347");
				msg.channel.send({ embed: embed5 });
				collector.stop();
			}
			if (cmsg.content.toLowerCase() === "yes") {
				embed6.setDescription(`**${member.user.username}** is now kicked. 🛴`)
					.setColor("#00FA9A");
				msg.channel.send({ embed: embed6 });
				member.kick();
				collector.stop();
			}
		});
	});
}
;
