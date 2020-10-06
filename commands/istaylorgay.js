module.exports = {
    name: 'gay',
    description: "This command speaks truth",
    execute(message, args){
        message.channel.send('According to my calculations');
        message.channel.send('.');
        message.channel.send('..');
        var x;
        var user = message.member.tag
        x = Math.floor(Math.random() * 2);
        if (!args[0]) {
            message.channel.send(`${message.author} is *very* gay!`);
        } else if (x == 0){
            message.channel.send(args[0] + ' is gay');
        } else if (x == 1) {
            message.channel.send(args[0] + ' is not gay');
        } else {
            message.channel.send('Something fucked up you fucking moron write better code.').console.log()
        }

    }
}