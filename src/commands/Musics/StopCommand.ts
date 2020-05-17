import { Command, Message } from '../../command';

export default class StopCommand extends Command {
  public constructor() {
    super("Stop", {
      aliases: ["stop"],
      category: "Musics",
      description: {
        content: "Interrompe a música que está tocando.",
        usage: "stop",
        examples: ["stop"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.stopped = true;
    // player.voiceBroadcast.on("end", () => {
    //   const { stopped, replay, repeat } = msg.client.players.get(msg.guild.id);
    //   console.log(stopped, replay, repeat);
    //   if(stopped && !replay) return;
    //   const dispatcher = player.connection.play(player.videoURL, msg.client.voiceOptions);
    //   player.dispatcher = dispatcher;
    // });
    player.voiceBroadcast.end();
    player.connection.disconnect();
  }
}
