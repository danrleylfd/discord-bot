import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class RegisterCommand extends Command {
  public constructor() {
    super("Register", {
      aliases: ["register"],
      category: "Props",
      description: {
        content: "Registra o canal de despedidas.",
        usage: "register",
        examples: ["register","sync"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    let dbGuild = await msg.client.models.Guild.findOne({ id: msg.guild.id });
    if(!dbGuild) dbGuild = msg.client.models.Guild.create({ id: msg.guild.id });
    dbGuild.name = msg.guild.name;
    dbGuild.icon = msg.guild.icon;
    dbGuild.iconURL = msg.guild.iconURL({ size: 4096 });
    await dbGuild.save();
    const embed = getMessage(msg).setTitle('Registro concluído.');
    return msg.util.send(embed);
  }
}
