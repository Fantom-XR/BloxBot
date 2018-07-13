const Discord = require('discord.js');
const enmap = require('enmap');
const EnmapMongo = require('enmap-mongo');
const client = new Discord.Client();
const settings = require('./settings.json');
const guilds = new enmap({provider: new EnmapMongo({name: 'guilds', dbName: 'Bloxclient'})});
const groups = new enmap({provider: new EnmapMongo({name: 'groups', dbName: 'Bloxclient'})});

guilds.defer.then(() => {
	groups.defer.then(() => {
		client.on('ready', () => {
			console.log(`Ready. Logged in as ${client.user.tag}. (ID: ${client.user.id})`);
			client.user.setActivity(`in ${client.guilds.size} servers | Prefix: ${settings.prefix}`);
		});
		
		// Command Handler by SunburntRock89 (https://github.com/SunburntRock89)
		
		client.on("message", async msg => {
			let prefix = settings.prefix;
			if (msg.author.bot) return null;
			if (!msg.content.startsWith(prefix)) return null;
			if (!msg.guild) return;
			const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "");
			const suffix = msg.content.split(" ").splice(1).join(" ").trim();
			let cmdFile;
			try {
				cmdFile = require(`./commands/${cmd}.js`);
				console.log(`${msg.author.tag} (${msg.author.id}) ran the ${cmd} command in ${msg.guild.name}.`);
			} catch (err) {
				return console.error(`There seems to have been an error completing the ${cmd} command, take a look: \n ${err}`);
			}
			if (cmdFile) {
				return cmdFile(client, msg, suffix);
			}
		});
		
		client.login(settings.token);
	});
});