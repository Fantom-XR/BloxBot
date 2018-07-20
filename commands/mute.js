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
	const embed9 = new Discord.RichEmbed();
	let member = msg.mentions.members.first();
	/*
		Credit to Mason for the reason code (https://github.com/mas0ngamingHD)
	*/
	let reason = suffix.split(" ").slice(1).join(" ");
	if (!msg.guild.roles.find("name", "Muted")) {
		embed1.setDescription("You don't have a `Muted` role! Please create one in order to use the mute command.")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}
	if (!msg.guild.roles.find("name", "Staff")) {
		embed2.setDescription("You don't have a `Staff` role! Please create one in order to use moderation commands.")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed2 });
	}
	if (!msg.member.roles.find("name", "Staff")) {
		embed3.setDescription("You don't have permissions to run this command! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed3 });
	}
	if (msg.mentions.users.size == 0) {
		embed4.setDescription("You need to mention a user! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed4 });
	}
	if (reason.length < 1) {
		embed5.setDescription("You need to include a reason! ❌")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed5 });
	}
	embed6.setDescription(`Are you sure you want to mute **${member.user.username}**? 🚦`)
		.setColor("#FFA500");
	/*
		Yet again, Message Collector by Hydrogen (https://github.com/thehydrogen)
	*/
	msg.channel.send({ embed: embed6 }).then(ctx => {
		let collector = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
		collector.on("collect", cmsg => {
			if (cmsg.content.toLowerCase() === "no") {
				embed7.setDescription("Mute cancelled. ❌")
					.setFooter("Please re-run the ?mute command if you change your mind.")
					.setColor("#FF6347");
				msg.channel.send({ embed: embed7 });
				collector.stop();
			}
			if (cmsg.content.toLowerCase() === "yes") {
				embed8.setDescription(`**${member.user.username}** has been muted. 🤐`)
					.setColor("#00FA9A");
				msg.channel.send({ embed: embed8 });
				msg.guild.member(msg.author).addRole(msg.guild.roles.find("name", "Muted")).catch(error => console.log(error));
				embed9.setDescription(`It looks like you've been muted in **${msg.guild.name}** by **${msg.author.username}**! 🤐 \n Reason: **${reason}**`)
					.setColor("#00BFFF");
				member.send({ embed: embed9 });
				collector.stop();
			}
		});
	});
};
