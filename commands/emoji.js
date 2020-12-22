const { MessageManager } = require("discord.js");

module.exports = {
    name: 'emoji',
    description: "fullsized emotes",
    execute(message, args) {
        message.delete();
        var emoji = `${args[0]}.png`;
        console.log(emoji)
        message.channel.send({files: [`C:\\Users\\nolan\\Desktop\\milkMan\\images\\${emoji}`] })
        }
}