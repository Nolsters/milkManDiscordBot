/*

milkMan Discord Bot

Tasks:
- Fix all errors that end the bots instance. (High Priority)
- Index youtube for link (Medium Priority - More info at bottom)
- Try implemting wophf comman (Low Priority)
- Implement website command center (Very-Low Priority)


Built By:
Nolsters

*/



const Discord = require('discord.js');  // Brings in the Discord.js API markup

const client = new Discord.Client();    // Delcares discord instance. 

const prefix = '!';

const fs = require('fs');               // Read and Write files feature. 

var servers = {};             

const ytdl = require("ytdl-core");

const prompt = require('prompt');

const queue = new Map();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on('guildMemberAdd', (guildMember) => {
  console.log('User Has JOINED')
  const welcome_channel = client.channels.cache.get('524741020093513753');
  const command = args.shift().toLowerCase();                                                           // FIX THE FUCK OUT OF THIS
  welcome_channel.send(`Welcome, <@${member.id}> you have been given 2% milk`);
  guildMember.roles.set(['450328239563341834', '672879195352727587']).catch(console.error);
});

client.on('message', message =>{
    try{
      if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
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
        } else if(command == 'vote'){
            client.commands.get('vote').execute(message, args);
        } else if(command == 'reminder'){
            try {
                var uniqueMessage = message.content.match(/".+?"/g).map(str => str.replace(/"/g, ''));
                client.commands.get('reminder').execute(message, args, uniqueMessage);
            } catch (error) {
                message.channel.send('Your formatting was incorect Try this:\n> !reminder in `#``seconds/minutes/days/hours` "`message` (optional)"\n\
                > !reminder on `YYYY`/`MM`/`DD` `##`:`##` "`message` (optional)"');
            }
        } else if(command == 'kick') {
            try {
              var uniqueMessage = message.content.match(/".+?"/g).map(str => str.replace(/"/g, ''));
              client.commands.get('kick').execute(message, args, uniqueMessage);
            } catch (error) {
              var uniqueMessage = 'x'
              client.commands.get('kick').execute(message, args, uniqueMessage);
            }
        } else if(command == 'emoji') {
            client.commands.get('emoji').execute(message, args, uniqueMessage);
        } else if(command == 'addmedia') {
            client.commands.get('addmedia').execute(message, args);
        } else if(command == 'addcontact') {
            client.commands.get('addcontact').execute(message, args);
        }
      }
    } catch (error) {
      var data = `${message.author}: ${message}\n ${error}`
      fs.writeFile('./logs/error.txt', data, (err) => {
          if (err) throw err;
      });
    }
  });


/*

AUDIO BOT

TO DO'S:

- Add youtube search function.
- Fix leaving and joining issue (add try statements)

*/

client.once("ready", () =>{
  //client.channels.cache.get(`524741020093513753`).send('Update Recieved');
    prompt.get(['Message'], function (err, result) {
      if (err) { return onErr(err); }
      console.log('Command-line input received:');
      console.log(result.Message);
      result = result.Message;
      client.channels.cache.get(`524741020093513753`).send(result);
    });
    function onErr(err) {
      console.log(err);
      return 1;
    }
    
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const serverQueue = queue.get(message.guild.id);
  
    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      return;
    } else {
      return;
    }
  });
  
  async function execute(message, serverQueue) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }

  
  

client.login(process.env.DISCORD_TOKEN);