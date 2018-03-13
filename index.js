const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');


client.on('message', message => {
  if (message.content === 'ping') {
      message.reply('pong');
  }
  if (message.content === 'pong') {
    message.reply('ping');
  }


  if (message.content === 'creator') {
    message.channel.send('a neef nickie is beste creator');
  }
  if(message.content.startsWith("melding")){
    var messagecontent = message.content.replace("melding ", "");
    message.channel.send(messagecontent);
    message.delete();
  }
  if (message.content === 'muziek join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (!message.guild) {
      message.reply("je moet wel in een speak zitten hond");
      return;
    };
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('laat het feest maar beginnen!! :)');
          connection.playStream("http://stream.radiocorp.nl/web10_mp3");
        })
        .catch(console.log);
    } else {
      message.reply('je moet wel een speak zitten hond ( ik moet wel perms hebben)');
    }
  }
  if(message.content == "muziek leave") {
    if(message.member.voiceChannel){
        message.member.voiceChannel.leave();
    } else {
        message.reply("bemoei je der niet mee hond");
    }
  }
  if(message.content.startsWith("muziek play")) {
          message.reply('laat het feest maar beginnen!! :)');
    var str = message.content;
    var link = str.substr(8);
    const streamOptions = { seek: 0, volume: 1 };
    message.member.voiceChannel.join()    .then(connection => {
        const stream = ytdl(link, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
      })
      .catch(console.error);
    }
});
client.login(process.env.TOKEN);
