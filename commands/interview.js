const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const question1 = new Discord.RichEmbed();
	const question1error = new Discord.RichEmbed();
	const question2 = new Discord.RichEmbed();
	const question2error = new Discord.RichEmbed();
	const finish = new Discord.RichEmbed();
	question1.setDescription("Who is the host of this interview?\n Please mention the user.")
		.setColor("#00BFFF");
	/*
		Message Collector by Hydrogen (https://github.com/thehydrogen)
	*/
	msg.channel.send({ embed: question1 }).then(ctx1 => {
		let collector1 = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
		collector1.on("collect", cmsg1 => {
			if (cmsg1.content.includes("<" && ">")) {
				question2.setDescription("Who is the co-host of this interview?\n Please mention the user.")
					.setColor("#00BFFF");
				msg.channel.send({ embed: question2 }).then(ctx2 => {
					let collector2 = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
					collector2.on("collect", cmsg2 => {
						if (cmsg2.content.includes("<" && ">")) {
							finish.setDescription("Interview process complete. 👌")
								.setColor("#00FA9A");
							msg.channel.send({ embed: finish });
							collector2.stop();
						} else {
							question2error.setDescription("You didn't mention a user!")
								.setFooter("Please re-run the ?interview command and try again.")
								.setColor("#FF6347");
							msg.channel.send({ embed: question2error });
							collector2.stop();
						}
					});
				});
				collector1.stop();
			} else {
				question1error.setDescription("You didn't mention a user!")
					.setFooter("Please re-run the ?interview command and try again.")
					.setColor("#FF6347");
				msg.channel.send({ embed: question1error });
				collector1.stop();
			}
		});
	});
};
