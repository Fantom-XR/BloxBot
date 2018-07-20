const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const embed1 = new Discord.RichEmbed();
	const embed2 = new Discord.RichEmbed();
	const embed3 = new Discord.RichEmbed();
	const embed4 = new Discord.RichEmbed();
	const embed5 = new Discord.RichEmbed();
	const embed6 = new Discord.RichEmbed();
	const embed7 = new Discord.RichEmbed();
	const embed8 = new Discord.RichEmbed();
	let member = msg.mentions.members.first();
	let reason = suffix.split(" ").slice(1).join(" ");
	if (!msg.guild.roles.find("name", "Staff")) {
		embed1.setDescription("You don't have a `Staff` role! Please create one in order to use moderation commands.")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}
	if (!msg.member.roles.find("name", "Staff")) {
		embed2.setDescription("You don't have permisson to run this command! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed2 });
	}
	if (msg.mentions.users.size == 0) {
		embed3.setDescription("You need to mention a user! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed3 });
	}
	if (reason.length == 0) {
		embed4.setDescription("You need to include a reason!")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed4 });
	}
	embed5.setDescription(`Are you sure you want to kick **${member.user.username}**? 🚦`)
		.setColor("#FFA500");
	/*
		Again, Messaage Collector by Hydrogen (https://github.com/thehydrogen)
	*/
	msg.channel.send({ embed: embed5 }).then(ctx => {
		let collector = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
		collector.on("collect", cmsg => {
			if (cmsg.content.toLowerCase() === "no") {
				embed6.setDescription("Kick cancelled. ❌")
					.setFooter("Please re-run the ?kick command if you change your mind.")
					.setColor("#FF6347");
				msg.channel.send({ embed: embed6 });
				collector.stop();
			}
			if (cmsg.content.toLowerCase() === "yes") {
				embed7.setDescription(`**${member.user.username}** is now kicked. 🛴`)
					.setColor("#00FA9A");
				msg.channel.send({ embed: embed7 });
				member.kick(reason);
				embed8.setDescription(`It looks like you've been kicked on **${msg.guild.name}** by ${msg.author.username}! 🛴 \n Reason: **${reason}**`)
					.setColor("#00BFFF");
				member.send({ embed: embed8 });
				collector.stop();
			}
		});
	});
}
;
