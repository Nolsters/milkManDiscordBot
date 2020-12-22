const { MessageManager } = require("discord.js");

module.exports = {
    name: 'addmedia',
    description: "fullsized emotes",
    execute(message, args) {
        const fs = require('fs');
        const dir = './videos';
        if(message.attachment)
        fs.readdir(dir, (err, files) => {
            filename = (files.length);
            console.log(filename);
        });
        var media = `${args[0]}`
        function writeFile(){
            return new Promise(resolve =>{
                resolve(video.pipe(fs.createWriteStream('C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4')));
            })
        }
        fs.createWriteStream('C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4')
        message.channel.send({files: [`C:\\Users\\nolan\\Desktop\\milkMan\\images\\${emoji}`] })
        }
}