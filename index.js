const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

var servers = {};

const ytdl = require("ytdl-core");

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




client.on('message',message =>{

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'play':
            
            function play(connection,message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0],{filter: 'audioonly'}));
                server.queue.shift();
                server.dispatcher.on("end",function(){
                    if(server.queue[0]){
                        play(connection,message);
                    } else {
                        connection.disconnect();
                    }
                });

            }

            if(!args[1]){
                message.channel.send("you need to provide a link");
                return;
            }
            if(!message.member.voice.channel){
                message.channel.send("you must be in a channel to play the bot !");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id]={
                queue :[]
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) 
            message.member.voice.channel.join().then(function(connection){
                play(connection,message);
            })

            break;
        case 'skip':
                var server = servers[message.guild.id];
                if(server.dispatcher) server.dispatcher.end();
                message.channel.send("song skipped")
        break;

        case 'stop':
                console.log('Testing the case');
                var server = servers[message.guild.id];
                if(message.guild.voiceConnection){
                    for(var i=server.queue.length -2;i>=0;i--){
                        server.queue.splice(i,1);
                    }
                    console.log('passed if loop')
                    server.dispatcher.end();
                    message.channel.send("Ending the queue leaving the voice channel")
                    console.log('stopped the queue')
                }
                if(message.guild.connection) message.member.voice.channel.leave();
        
        break;

    }
})

client.login('NzU1NTA4NDU2NDcxMTM0MjI4.X2EUFA.aG4HYdAf0avRr_zkIi4kUORsM44');