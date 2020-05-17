import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class ReportsCommand extends Command {
  public constructor() {
    super("Reports", {
      aliases: ["reports"],
      category: "Feedback",
      description: {
        content: "Reporte problemas com esse comando.",
        usage: "reports",
        examples: ["reports"]
      },
      ratelimit: 3,
      args: [
        {
          id: "feedback",
          match: "text",
          default: undefined
        }
      ]
    });
  }

  public async exec(msg: Message, { feedback }): Promise<Message|any> {
    if(!feedback) return;
    const dbGuild = await msg.client.models.Guild.findOne({ id: msg.guild.id });
    if(!dbGuild) return;
    const { feedbackChannel } = dbGuild;
    if(!feedbackChannel) return;
    const embedFeedback =  getMessage(msg)
      .setTitle("**Denúncia**")
      .setDescription(feedback);
    const channel: any = await msg.client.channels.resolve(feedbackChannel);
    const msgReports: Message = await channel.send(embedFeedback);
    await msgReports.react('👍');
    await msgReports.react('👎');
    const embed = getMessage(msg)
      .setDescription('Obrigado pelo seu feedback.');
    return msg.util.send(embed);
  }
}
