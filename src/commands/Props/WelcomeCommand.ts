import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class WelcomeCommand extends Command {
  public constructor() {
    super("Welcome", {
      aliases: ["welcome"],
      category: "Props",
      description: {
        content: "Registra o canal de boas-vindas.",
        usage: "welcome",
        examples: ["welcome"]
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
    dbGuild.welcomeChannel = channel;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Cargo definido.');
    return msg.util.send(embed);
  }
}
