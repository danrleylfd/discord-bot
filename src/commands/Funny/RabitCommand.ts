import ImgurCommand from '../../command/imgur';
import { Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class RabitCommand extends ImgurCommand {
  public constructor() {
    super("Rabit", {
      aliases: ["rabit"],
      category: "Funny",
      description: {
        content: "Exibe imagens aleatórios de coelhos.",
        usage: "rabit",
        examples: ["rabit"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "rabit" });
    const embed = getMessage(msg).setImage(image);
    return msg.util.send(embed);
  }
}
