import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class EvalCommand extends Command {
  public constructor() {
    super("Eval", {
      ownerOnly: true,
      aliases: ["eval"],
      category: "Depuration",
      description: {
        content: "Execute comandos TS/JS.",
        usage: "eval",
        examples: ["eval","eval <code>"],
      },
      ratelimit: 3,
      args: [
        {
          id: "supress",
          match: "flag",
          flag: "-supress",
          default: undefined
        },
        {
          id: "code",
          match: "text",
          default: "msg.util.send(`uptime: ${client.uptime}`)"
        }
      ]
    });
  }

  public exec(msg: Message, { supress, code }): Promise<Message|any> {
    let output;
    try { output = eval(code); }
    catch (e) { output = e.message; }
    const embed = getMessage(msg)
      .setDescription(':warning: Esses experimentos podem morder.')
      .addField('Entrada:', `\`\`\`js\n${code}\n\`\`\``, true)
      .addField('Saída:', `\`\`\`js\n${output}\n\`\`\``, true);
    return !!supress ? undefined : msg.util.send(embed);
  }
}
