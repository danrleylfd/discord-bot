import { Command, Message } from '../../command';

export default class PauseCommand extends Command {
  public constructor() {
    super("Pause", {
      aliases: ["pause"],
      category: "Musics",
      description: {
        content: "Pausa a música que está tocando.",
        usage: "play",
        examples: ["pause"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.dispatcher.pause();
  }
}
