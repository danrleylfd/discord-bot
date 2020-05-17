import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class InviteCommand extends Command {
  public constructor() {
    super("Invite", {
      aliases: ["invite","convite"],
      category: "Information",
      description: {
        content: "Gera um convite do bot.",
        usage: "invite",
        examples: ["invite"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const invite = await this.client.generateInvite();
    const app = await this.client.fetchApplication();
    const embed = getMessage(msg)
      .setTitle(app.name)
      .setURL(invite)
      .setDescription(app.description)
      .setThumbnail(app.iconURL({ size: 4096 }));
    return msg.util.send(embed);
  }
}
