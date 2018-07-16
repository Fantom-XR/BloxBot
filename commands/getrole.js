const Discord = require("discord.js");
const roblox = require("roblox-js");

module.exports = async(client, msg, suffix) => {
	const user = suffix.substring(0, suffix.indexOf(" ")).trim();
	const group = suffix.substring(suffix.indexOf(" ") + 1).trim();
	const embed1 = new Discord.RichEmbed();
	const embed2 = new Discord.RichEmbed();
	const embed3 = new Discord.RichEmbed();
	const embed4 = new Discord.RichEmbed();
	if (user.length == 0) {
		embed1.setDescription("You need to enter a user ID for me to check.\n Please use the following format: ` ?getrole [your user ID] [group ID] `")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}
	if (group.length == 0) {
		embed2.setDescription("You need to enter a group ID for me to check.")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed2 });
	}
	roblox.getRankNameInGroup(user, group)
		.then(name => {
			if (name == "Bad Request") {
				embed3.setDescription("Group not found. ❌")
					.setColor("#FF6347");
				return msg.channel.send({ embed: embed3 });
			}
			embed4.setDescription(`Your rank in Group **${group}** is **${name}.** ℹ️`)
				.setColor("#00FA9A");
			msg.channel.send({ embed: embed4 });
		});
};
