import { Command, Message } from '../../command';
import { ImageSize } from 'discord.js';
import getMessage from '../../utils/getMessage';

export default class AvatarCommand extends Command {
  public constructor() {
    super("Avatar", {
      aliases: ["avatar"],
      category: "Information",
      description: {
        content: "Exibe o avatar do usuário.",
        usage: "avatar",
        examples: ["avatar","avatar <@member>","avatar <size>","avatar <@member> <size>","avatar <size> <@member>"]
      },
      ratelimit: 3,
      args: [
        {
          id: "member",
          type: "member",
          match: "rest",
          default: (msg: Message) => msg.member
        },
        {
          id: "size",
          type: (_: Message, str: string): null | Number => {
            if(str && !isNaN(Number(str)) && [16,24,32,64,128,256,512,1024,2048,4096].includes(Number(str))) return Number(str);
            return null;
          },
          match: "text",
          default: 4096
        }
      ]
    });
  }

  public exec(msg: Message, { member, size }): Promise<Message|any> {
    const embed = getMessage(msg).setImage(member.user.displayAvatarURL({ size: size as ImageSize }));
    return msg.util.send(embed);
  }
}
