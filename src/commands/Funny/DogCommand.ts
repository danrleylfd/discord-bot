import ImgurCommand from '../../command/imgur';
import { Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class DogCommand extends ImgurCommand {
  public constructor() {
    super("Dog", {
      aliases: ["dog"],
      category: "Funny",
      description: {
        content: "Exibe imagens aleatórios de cães.",
        usage: "dog",
        examples: ["dog"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "dog" });
    const embed = getMessage(msg).setImage(image);
    return msg.util.send(embed);
  }
}
