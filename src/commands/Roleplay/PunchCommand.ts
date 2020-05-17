import { Message } from '../../command';
import ImgurCommand from '../../command/imgur';
import getMessage from '../../utils/getMessage';

export default class PunchCommand extends ImgurCommand {
  public constructor() {
    super("Punch", {
      aliases: ["punch","soco"],
      category: "Roleplay",
      description: {
        content: "Dê um belo soco no seu amiguinho.",
        usage: "punch",
        examples: ["punch","punch @member"]
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
    const image: string = await super.exec(msg, { label: "punch" });
    const embed = getMessage(msg)
      .setTitle(`${msg.author.username} deu um soco em ${member.user.username}`)
      .setImage(image);
    return msg.util.send(embed);
  }
}
