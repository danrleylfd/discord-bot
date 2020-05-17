import { Command, Message } from '../../command';

export default class ResumeCommand extends Command {
  public constructor() {
    super("Resume", {
      aliases: ["resume"],
      category: "Musics",
      description: {
        content: "Continua a música que está pausada.",
        usage: "resume",
        examples: ["resume"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return;
    player.dispatcher.resume();
  }
}
