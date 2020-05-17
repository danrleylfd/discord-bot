import ImgurCommand from '../../command/imgur';
import { Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class CatCommand extends ImgurCommand {
  public constructor() {
    super("Cat", {
      aliases: ["cat","gato"],
      category: "Funny",
      description: {
        content: "Exibe imagens aleatórios de gatos.",
        usage: "cat",
        examples: ["cat"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "cat" });
    const embed = getMessage(msg).setImage(image);
    return msg.util.send(embed);
  }
}
