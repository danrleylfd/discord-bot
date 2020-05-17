import { Message } from '../../command';
import ImgurCommand from '../../command/imgur';
import getMessage from '../../utils/getMessage';

export default class SlapCommand extends ImgurCommand {
  public constructor() {
    super("Slap", {
      aliases: ["slap","tapa"],
      category: "Roleplay",
      description: {
        content: "Dê um belo tapa no seu amiguinho.",
        usage: "slap",
        examples: ["slap","slap @member"]
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
    const image: string = await super.exec(msg, { label: "slap" });
    const embed = getMessage(msg)
      .setTitle(`${msg.author.username} deu um tapa em ${member.user.username}`)
      .setImage(image);
    return msg.util.send(embed);
  }
}
