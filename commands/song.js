const { MessageManager } = require("discord.js");

module.exports = {
    name: 'song',
    description: "This command speaks truth",
    execute(message, args){
        const member = message.mentions.members.first();
        console.log(member);
        const game = member.presence.activity;
        console.log(game);
    }
}