import { Command, Message } from '../../command';

export default class ReplayCommand extends Command {
  public constructor() {
    super("Replay", {
      ownerOnly: true,
      aliases: ["replay"],
      category: "Musics",
      description: {
        content: "Repete a música que está tocando.",
        usage: "replay",
        examples: ["replay"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.replay = !player.replay;
  }
}
