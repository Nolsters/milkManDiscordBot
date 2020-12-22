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
        function writeFile(){
            return new Promise(resolve =>{
                resolve(video.pipe(fs.createWriteStream('C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4')));
            })
        }
        async function call(){
            const result = await writeFile();
            message.delete()
            message.channel.send(`Heres your video ${message.author}:`, { files: ["C:\\Users\\nolan\\Desktop\\milkMan\\videos\\video.mp4"] });
            console.log('After Dispatching video file')
        }
        console.log('Before dispatching video file');
        call();
    }
    
}