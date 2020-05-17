import { Message } from '../../command';
import ImgurCommand from '../../command/imgur';
import getMessage from '../../utils/getMessage';

export default class KickCommand extends ImgurCommand {
  public constructor() {
    super("Kick", {
      aliases: ["kick","chute"],
      category: "Roleplay",
      description: {
        content: "Dê um belo chute no seu amiguinho.",
        usage: "kick",
        examples: ["kick","kick @member"]
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
    const image: string = await super.exec(msg, { label: "kick" });
    const embed = getMessage(msg)
      .setTitle(`${msg.author.username} deu um chute em ${member.user.username}`)
      .setImage(image);
    return msg.util.send(embed);
  }
}
