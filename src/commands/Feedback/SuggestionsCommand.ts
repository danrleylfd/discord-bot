import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class SuggestionsCommand extends Command {
  public constructor() {
    super("Suggestions", {
      aliases: ["suggestions"],
      category: "Feedback",
      description: {
        content: "Envie sugestões com esse comando.",
        usage: "suggestions",
        examples: ["suggestions"]
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
      .setTitle("**Sugestão**")
      .setDescription(feedback);
    const channel: any = await msg.client.channels.resolve(feedbackChannel);
    const msgSuggestion: Message = await channel.send(embedFeedback);
    await msgSuggestion.react('👍');
    await msgSuggestion.react('👎');
    const embed = getMessage(msg)
      .setDescription('Obrigado pelo seu feedback.');
    return msg.util.send(embed);
  }
}
