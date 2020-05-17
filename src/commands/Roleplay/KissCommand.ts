import { Message } from '../../command';
import ImgurCommand from '../../command/imgur';
import getMessage from '../../utils/getMessage';

export default class KissCommand extends ImgurCommand {
  public constructor() {
    super("Kiss", {
      aliases: ["kiss","beijar"],
      category: "Roleplay",
      description: {
        content: "Dê um belo beijo no seu amiguinho.",
        usage: "kiss",
        examples: ["kiss","kiss @member"]
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
    const image: string = await super.exec(msg, { label: "kiss" });
    const embed = getMessage(msg)
      .setTitle(`${msg.author.username} beijou ${member.user.username}`)
      .setImage(image);
    return msg.util.send(embed);
  }
}
