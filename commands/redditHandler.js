module.exports = {
    name: 'redditHandler',
    description: "A command to mut users",
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('This is a reddit link')
            .setAuthor(message.author.username)
            .setURL(args[0])
            .setImage(image)
            .setColor('#FF5700')
            .setDescription('Hello\n This is a reddit link!')
            .setFooter('Made by MilkMan')

        message.channel.send(embed);


    }
}