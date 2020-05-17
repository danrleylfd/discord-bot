import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class AutoRoleBotCommand extends Command {
  public constructor() {
    super("AutoRoleBot", {
      aliases: ["autorolebot"],
      category: "Props",
      description: {
        content: "Registra o cargo inicial dos bots.",
        usage: "autorolebot",
        examples: ["autorolebot"]
      },
      ratelimit: 3,
      args: [
        {
          id: "role",
          type: "role",
          match: "rest",
          default: (msg: Message) => msg.mentions.roles.first()
        },
      ]
    });
  }

  public async exec(msg: Message, { role }): Promise<Message|any> {
    if(!role) return;
    const dbGuild = await msg.client.models.Guild.findOne({ id: msg.guild.id });
    if(!dbGuild) return;
    dbGuild.autoRoleBot = role;
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Cargo definido.');
    return msg.util.send(embed);
  }
}
