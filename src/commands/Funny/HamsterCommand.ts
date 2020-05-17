import ImgurCommand from '../../command/imgur';
import { Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class HamsterCommand extends ImgurCommand {
  public constructor() {
    super("Hamster", {
      aliases: ["hamster"],
      category: "Funny",
      description: {
        content: "Exibe imagens aleatórios de hamsters.",
        usage: "hamster",
        examples: ["hamster"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "hamster" });
    const embed = getMessage(msg).setImage(image);
    return msg.util.send(embed);
  }
}
