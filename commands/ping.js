const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const embed = new Discord.RichEmbed();
	embed.setDescription(`Pong! Our connection is ${Math.floor(client.ping)}ms. 🏓`)
		.setColor("#00FA9A");
	msg.channel.send({ embed });
}
;
