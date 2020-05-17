import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';
import discloud from 'discloud-status';

export default class HostCommand extends Command {
  public constructor() {
    super("Host", {
      aliases: ["host"],
      category: "Information",
      description: {
        content: "Checa informações de hospedagem.",
        usage: "host",
        examples: ["host"]
      },
      ratelimit: 3
    });
  }

  public exec(msg: Message): Promise<Message|any> {
    const embed = getMessage(msg)
      .addField("RAM Em Uso:", discloud.usoRam() || "0MB", true)
      .addField("RAM Total:", discloud.totalRam() || "{null}MB", true)
      .addField("Resumo:", discloud.ram() || "0/{null}MB");
    return msg.util.send(embed);
  }
}
