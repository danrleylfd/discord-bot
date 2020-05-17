import { Command, Message } from '../../command';

export default class VolumeCommand extends Command {
  public constructor() {
    super("Volume", {
      aliases: ["volume"],
      category: "Musics",
      description: {
        content: "Altera o volume da música que está tocando.",
        usage: "volume",
        examples: ["volume"],
      },
      ratelimit: 3,
      args: [
        {
          id: "volume",
          type: (_: Message, str: string): null | Number => {
            if(str && !isNaN(Number(str)) && Number(str) >= 0 && Number(str) <= 200) return Number(str)/100;
            return null;
          },
          match: "text",
          default: 1
        }
      ]
    });
  }

  public async exec(msg: Message, { volume }): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.dispatcher.setVolume(volume);
  }
}
