const { info } = require('console');

module.exports = {
    name: 'mp4',
    description: "A command to mut users",
    execute(message, args){
        const fs = require('fs');
        const dir = './videos';
        var filename;

        fs.readdir(dir, (err, files) => {
            filename = (files.length);
            console.log(filename);
        });
        const youtubedl = require('youtube-dl');
        const video = youtubedl(args[0], 
            ['--format=18'],
            { cwd: __dirname});

        video.on('info', function(info) {
            console.log('Download started')
            filename = info._filename
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)
        });
        filename = filename + 1;
        var finalFilename = filename + '';
              
        video.pipe(fs.createWriteStream('C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4'));
        const Discord = require('discord.js');
        setTimeout(() => message.channel.send("Heres your video:.", { files: ["C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4"] }), 10000);


    }
}