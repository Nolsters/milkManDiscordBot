const { MessageManager } = require("discord.js");
const { fstat } = require("fs");

module.exports = {
    name: 'addcontact',
    description: "Adds a contact for a user.",
    execute(message, args){
        message.channel.send('PRIMER')
        if(message.mentions.members.size){
            message.channel.send('SUCCESS!')
        } else {
            message.channel.send(`You didn't mention a user`)
        }
    }
}