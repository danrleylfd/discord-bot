import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class EventCommand extends Command {
  public constructor() {
    super("Event", {
      aliases: ["event"],
      category: "Props",
      description: {
        content: "Ativa ou Desativa um evento.",
        usage: "event",
        examples: ["event"]
      },
      ratelimit: 3,
      args: [
        {
          id: "event",
          type: (_: Message, str: string): null | string => {
            if(str) return str;
            return null;
          },
          match: "text",
          default: undefined
        },
        {
          id: "toggle",
          type: (_: Message, str: string): null | string => {
            if(str && ["on","off"].includes(str)) return str;
            return "off";
          },
          match: "text",
          default: "off"
        }
      ]
    });
  }

  public async exec(msg: Message, { event, toggle }): Promise<Message|any> {
    if(!event) return;
    const dbGuild = await msg.client.models.Guild.findOne({ id: msg.guild.id });
    if(!dbGuild) return;
    dbGuild[event] = toggle;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle(`Evento ${event} ${!!toggle ? "Ativado" : "Desativado"}.`);
    return msg.util.send(embed);
  }
}
