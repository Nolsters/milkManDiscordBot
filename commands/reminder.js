module.exports = {
    name: 'reminder',
    description: "A command to mut users",
    execute(message, args, uniqueMessage){
        var time = '';
        if(args[0] == 'in'){
            var x = args[1];
            var y = args[1];
            if(args[2] == 'seconds'){
                x = x * 1000;
                time = 'seconds';
            } else if(args[2] == 'minute' || args[2] == 'minutes'){
                x = ((x * 1000) * 60);
                time = 'minutes';
            } else {
                message.channel.send("Dude you fucked up the command");
            }
            message.channel.send(`Reminder being set for ${y} ${time}`);

            setTimeout(() => {
                console.log(x);
                message.channel.send(`${message.author}, here is your reminder: \n>>> ${uniqueMessage}`);
            }, x);
        }

    }
}