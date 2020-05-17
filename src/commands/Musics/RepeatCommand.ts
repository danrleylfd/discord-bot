import { Command, Message } from '../../command';

export default class RepeatCommand extends Command {
  public constructor() {
    super("Repeat", {
      ownerOnly: true,
      aliases: ["repeat"],
      category: "Musics",
      description: {
        content: "Repete a playlist que está tocando.",
        usage: "repeat",
        examples: ["repeat"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.repeat = !player.repeat;
  }
}
