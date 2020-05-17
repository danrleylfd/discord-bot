import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class CmdCommand extends Command {
  public constructor() {
    super("Cmd", {
      aliases: ["cmd"],
      category: "Props",
      description: {
        content: "Registra o canal de comandos.",
        usage: "cmd",
        examples: ["cmd"]
      },
      ratelimit: 3,
      args: [
        {
          id: "defaultChannel",
          type: "channel",
          match: "rest",
          default: (msg: Message) => msg.channel
        },
      ]
    });
  }

  public async exec(msg: Message, { defaultChannel }): Promise<Message|any> {
    const channel = (!!msg.mentions.channels.first()) ? msg.mentions.channels.first().id : defaultChannel.id;
    const dbGuild = await msg.client.models.Guild.findOne({ id: msg.guild.id });
    if(!dbGuild) return;
    dbGuild.commandChannel = channel;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Cargo definido.');
    return msg.util.send(embed);
  }
}
