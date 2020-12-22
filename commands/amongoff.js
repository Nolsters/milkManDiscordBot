module.exports = {
    name: 'amongoff',
    description: "Mute all users in voice call!",
    execute(message, args){
        const Discord = require('discord.js');
        const client = new Discord.Client();
        if(message.member.roles.cache.has('431261935091318784')){
            if (message.member.voice.channel) {
                let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                for (const [memberID, member] of channel.members) {
                  // I added the following if statement to mute everyone but the invoker:
                  // if (member != message.member)no
              
                  // This single line however, nested inside the for loop, should mute everyone in the channel:
                    member.voice.setMute(false);
                }
                for (const [memberID, member] of channel.members) {
                    // I added the following if statement to mute everyone but the invoker:
                    // if (member != message.member)no
                
                    // This single line however, nested inside the for loop, should mute everyone in the channel:
                    member.voice.setMute(false);
                }
                message.react('✅');
            } else {
                message.react('❌')
            }
        } else {
            message.react('❌')
        }

    }
}