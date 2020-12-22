const { MessageManager } = require("discord.js");

module.exports = {
    name: 'kick',
    description: "This command speaks truth",
    execute(message, args, uniqueMessage){
        if(message.member.roles.cache.has('705937328807346269') || message.member.roles.cache.has('431261935091318784')){
            const member = message.mentions.members.first();
            if (member.roles.cache.has('705937328807346269') || member.roles.cache.has('431261935091318784')){
                message.channel.send(`${member} has diplomatic immunity.`);
            } else {
                member.send('Being Horny!\n https://discord.gg/ASvFwrYTSM', { files: ["C:\\Users\\nolan\\Desktop\\milkMan\\videos\\HornyMans.mov"] });
                setTimeout(() => {
                    member.kick();
                    if (uniqueMessage == 'x') {
                        message.channel.send('Bye! ' + args[0]);
                    } else {
                        message.channel.send('Bye! ' + args[0] + `Reason: ${uniqueMessage}`);
                    }
                }, 1000);
            }

        } else {
            message.channel.send("Who the fuck do you think you are?")
        }
    }
}