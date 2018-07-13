const Discord = require('discord.js');

module.exports = async(client, msg, suffix) => {
	const embed = new Discord.RichEmbed();
	embed.setTitle("BloxBot Help Menu")
	.setDescription("Here is a list of commands that BloxBot has.")
	.addField("ping", "Tests the ping connection of the bot with a milliseconds value.", true)
	.setColor("#00BFFF")
	.setThumbnail(client.user.avatarURL)
	msg.channel.send({embed});
}