module.exports = {
    name: 'hi',
    description: "This is a greeting command!",
    execute(message, args){
        var x;
        x = Math.floor(Math.random() * 10);
        if (x == 0){
            message.channel.send('Get the fuck out of my house.');
        } else if (x == 1) {
            message.channel.send('Im busy get the fuck out of my face.');
        } else if (x == 2) {
            message.channel.send('Hi, How are you?');
        } else if (x == 3) {
            message.channel.send('I fucked your mom and your whole squad.');
        } else if (x == 4) {
            message.channel.send('Fuck you dipshit!');
        } else if (x == 5) {
            message.channel.send('Honestly I could give less then 2 shits about you. Get out of my face!');
        } else if (x == 6) {
            message.channel.send('Is your name Sarge? Cause your acting hella retarded.');
        } else if (x == 7) {
            message.channel.send('Get the fuck out of here');
        }else if (x == 8) {
            message.channel.send('Im sleeping you dumbass.');
        } else if (x == 9) {
            message.channel.send('Screw you!');
}}}