const commando = require('discord.js-commando');
const path = require('path');

const bot = new commando.Client({
	commandPrefix: '$', 	//Gosia's Oryginal Bot Assistant
	owner: process.env.BOT_OWNER,
	disableEveryone: true
});

bot.registry
	.registerGroups([
		['random', 'Random'],
		['weather', 'Weather']
		])
	.registerDefaults()
	.registerCommandsIn(__dirname + "/commands");


bot.on('message', async message => {

    if (message.content == 'ping') { //jezeli ktos napisze na kanale "ping"
        message.channel.sendMessage('pong'); // odpisz na kanale "pong"
    }

});


bot.login(process.env.BOT_TOKEN); 
