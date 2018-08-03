const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const embed = new Discord.RichEmbed();
	const DMs = new Discord.RichEmbed();
	embed.setTitle("BloxBot Help Menu")
		.setDescription("Here is a list of commands that BloxBot has.")
		.addField("ping", "Tests the ping connection of the bot with a milliseconds value. `?ping`", true)
		.addField("help", "DMs you this list of commands. `?help`", true)
		.addField("getrole", "Gets the role of a particular user in any Roblox group. `?getrole [user ID] [group ID]`", true)
		.addField("interview", "Allows you to store basic information about an interview. `?interview`", true)
		.addField("eval", "Allows you to evaluate JavaScript code. **Developers Only** `?eval [code]`", true)
		.addField("ban", "Allows you to ban a certain user with a custom reason. `?ban [user] [reason]`", true)
		.addField("kick", "Allows you to kick a certain user with a custom reason. `?kick [user] [reason]`", true)
		.addField("mute", "Allows you to mute a mentioned user with a custom reason. `?mute [user] [reason]`", true)
		.addField("unmute", "Allows you to unmute a mentioned user. `?mute [user]`", true)
		.addField("puser", "Allows you to add a premium user. **Developers only** `?puser [user]`", true)
		.setColor("#00BFFF")
		.setThumbnail(client.user.avatarURL);
	msg.author.send({ embed });

	DMs.setDescription("Check your DMs. 📩")
		.setColor("#00BFFF");
	msg.channel.send({ embed: DMs });
};
