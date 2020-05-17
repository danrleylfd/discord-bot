import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class ByeCommand extends Command {
  public constructor() {
    super("Bye", {
      aliases: ["bye"],
      category: "Props",
      description: {
        content: "Registra o canal de despedidas.",
        usage: "bye",
        examples: ["bye"]
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
    dbGuild.byeChannel = channel;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Cargo definido.');
    return msg.util.send(embed);
  }
}
