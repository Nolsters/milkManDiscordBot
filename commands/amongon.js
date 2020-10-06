module.exports = {
    name: 'amongon',
    description: "Mute all users in voice call!",
    execute(message, args){
        const Discord = require('discord.js');
        const client = new Discord.Client();
        if(message.member.roles.cache.has('431261935091318784')){
            if (message.member.voice.channel) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Muting all users!')
                .setAuthor(message.author.username)
                .setColor('#8a0303')
                .setFooter('Milkman Milking the Cow')
                client.channels.get(`626128175881256998`).send(embed);
                for (const [memberID, member] of channel.members) {
                  // I added the following if statement to mute everyone but the invoker:
                  // if (member != message.member)
              
                  // This single line however, nested inside the for loop, should mute everyone in the channel:
                    member.voice.setMute(true);
                }
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('You\'re not in a voice channel')
                    .setAuthor(message.author.username)
                    .setColor('#8a0303')
                    .setFooter('Milkman Milking the Cow')
                    client.channels.get(`626128175881256998`).send(embed);
              }
            } else {
                return;
            }


    }
}