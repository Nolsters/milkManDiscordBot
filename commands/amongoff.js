module.exports = {
    name: 'amongoff',
    description: "Mute all users in voice call!",
    execute(message, args){
        const Discord = require('discord.js');
        
        if(message.member.roles.cache.has('431261935091318784')){
            if (message.member.voice.channel) {
                let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                const embed = new Discord.MessageEmbed()
                .setTitle('Unmuting all users!')
                .setAuthor(message.author.username)
                .setColor('#8a0303')
                .setFooter('Milkman Milking the Cow')
                message.reply(embed);
                for (const [memberID, member] of channel.members) {
                  // I added the following if statement to mute everyone but the invoker:
                  // if (member != message.member)
              
                  // This single line however, nested inside the for loop, should mute everyone in the channel:
                    member.voice.setMute(false);
                }
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('You\'re not in a voice channel')
                    .setAuthor(message.author.username)
                    .setColor('#8a0303')
                    .setFooter('Milkman Milking the Cow')
                    message.reply(embed);
              }
            } else {
                return;
            }

    }
}