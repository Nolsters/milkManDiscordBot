const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "!help",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
 });

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(message.content.startsWith("https://www.reddit.com")){
        message.channel.send('This is a reddi link');
    }
    
    if(command === 'hi'){
        client.commands.get('hi').execute(message, args);
    } else if(command == 'gay') {
        client.commands.get('gay').execute(message, args);
    } else if(command == 'mute') {
        client.commands.get('muteUsers').execute(message, args);
    } else if(command == 'reddit') {
        client.commands.get('redditHandler').execute(message, args);
    } else if(command == 'amongon') {
        client.commands.get('amongon').execute(message, args);
    } else if(command == 'amongoff') {
        client.commands.get('amongoff').execute(message, args);
    } else if(command == 'mp4'){
        client.commands.get('mp4').execute(message, args);
    }
});



client.login('NzU1NTA4NDU2NDcxMTM0MjI4.X2EUFA.cFhHUHnoutxiGlC4kqB3pkaIflo');

