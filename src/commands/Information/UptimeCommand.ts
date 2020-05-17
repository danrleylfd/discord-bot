import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class UptimeCommand extends Command {
  public constructor() {
    super("Uptime", {
      aliases: ["uptime","up","time"],
      category: "Information",
      description: {
        content: "Exibe quanto tempo passou desde que o bot foi ligado.",
        usage: "uptime",
        examples: ["uptime","up","time"]
      },
      ratelimit: 3,
      editable: false,
    });
  }

  private _uptimeFactoration(uptimeCounter: number): string {
    let totalSeconds = (uptimeCounter / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) - (days * 24);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    let uptime = 'há ';
    const updateUptime = (time, up, lb) => (time > 0) ? `${up}${time}${lb} ` : up;
    uptime = updateUptime(days, uptime, "D");
    uptime = updateUptime(hours, uptime, "h");
    uptime = updateUptime(minutes, uptime, "m e ");
    uptime += `${seconds}s`;
    return uptime;
  }

  public exec(msg: Message): Promise<Message|any> {
    const uptime = this._uptimeFactoration(msg.client.uptime);
    const embed = getMessage(msg).setTitle(this.id).setDescription(uptime);
    return msg.util.send(embed);
  }
}
