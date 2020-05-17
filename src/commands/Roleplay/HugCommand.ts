import { Message } from '../../command';
import ImgurCommand from '../../command/imgur';
import getMessage from '../../utils/getMessage';

export default class HugCommand extends ImgurCommand {
  public constructor() {
    super("Hug", {
      aliases: ["hug","abraçar"],
      category: "Roleplay",
      description: {
        content: "Dê um belo abraço no seu amiguinho.",
        usage: "hug",
        examples: ["hug","hug @member"]
      },
      ratelimit: 3,
      args: [
        {
          id: "member",
          type: "member",
          match: "rest",
          default: (msg: Message) => msg.guild.me
        }
      ]
    });
  }

  public async exec(msg: Message, { member }): Promise<Message|any> {
    const image: string = await super.exec(msg, { label: "hug" });
    const embed = getMessage(msg)
      .setTitle(`${msg.author.username} abraçou ${member.user.username}`)
      .setImage(image);
    return msg.util.send(embed);
  }
}
