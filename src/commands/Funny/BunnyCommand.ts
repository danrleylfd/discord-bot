import ImgurCommand from '../../command/imgur';
import { Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class BunnyCommand extends ImgurCommand {
  public constructor() {
    super("Bunny", {
      aliases: ["bunny","coelho"],
      category: "Funny",
      description: {
        content: "Exibe imagens aleatórios de coelhinhos.",
        usage: "bunny",
        examples: ["bunny"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "bunny" });
    const embed = getMessage(msg).setImage(image);
    return msg.util.send(embed);
  }
}
