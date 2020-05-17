import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class FeedbackCommand extends Command {
  public constructor() {
    super("Feedback", {
      aliases: ["feedback"],
      category: "Props",
      description: {
        content: "Registra o canal de feedbacks.",
        usage: "feedback",
        examples: ["feedback"]
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
    dbGuild.feedbackChannel = channel;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Cargo definido.');
    return msg.util.send(embed);
  }
}
