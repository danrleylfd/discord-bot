import { Command, Message } from '../../command';
import ytdl from 'ytdl-core';
import { Player } from '../../client';

export default class PlayCommand extends Command {
  public constructor() {
    super("Play", {
      aliases: ["play"],
      category: "Musics",
      description: {
        content: "Toca músicas usando a id de um video do youtube.",
        usage: "play",
        examples: ["play","play <videoID>"],
      },
      ratelimit: 3,
      args: [
        {
          id: "videoID",
          match: "text",
          default: undefined
        }
      ]
    });
  }

  public async exec(msg: Message, { videoID }): Promise<Message|any> {
    if(!videoID) return msg.util.send('Você esqueceu de fornecer o videoID.');
    if(!msg.member.voice.channel) return msg.util.send('Primeiro você deve entrar em um canal de voz.');
    const connection = await msg.member.voice.channel.join();
    const isValidID = await ytdl.validateID(videoID);
    const videoURL = `https://youtu.be/${videoID}`;
    const isValidURL = await ytdl.validateURL(videoURL);
    if(!isValidID || !isValidURL) return msg.util.send('Video inválido.');
    const info = await ytdl.getInfo(videoURL);
    const voiceBroadcast = ytdl(videoURL, msg.client.voiceOptions);
    const dispatcher = connection.play(voiceBroadcast);
    const player: Player = { connection, voiceBroadcast, dispatcher, videoID, videoURL,
      info: {
        author: {
          name: info.author.name,
          avatar: info.author.avatar,
          url: info.author.channel_url || info.author.user_url
        },
        thumbnail: `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
        title: info.title
      }
    };
    // player.voiceBroadcast.on("end", () => {
    //   const { stopped, replay, repeat } = msg.client.players.get(msg.guild.id);
    //   console.log(stopped, replay, repeat);
    //   if(stopped && !replay) return;
    //   const dispatcher = player.connection.play(player.videoURL, msg.client.voiceOptions);
    //   player.dispatcher = dispatcher;
    // });
    msg.client.players.set(msg.guild.id, player);
  }
}
