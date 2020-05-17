import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class PingCommand extends Command {
  public constructor() {
    super("Ping", {
      aliases: ["ping"],
      category: "Information",
      description: {
        content: "Checa a latencia de ping da DiscordAPI.",
        usage: "ping",
        examples: ["ping"]
      },
      ratelimit: 3,
      editable: false,
    });
  }

  public exec(msg: Message): Promise<Message|any> {
    const embed = getMessage(msg)
      .setTitle(this.id)
      .setDescription(`:ping_pong: ${Math.floor(Date.now() - msg.createdAt.getTime())}ms.`);
    return msg.util.send(embed);
  }
}
