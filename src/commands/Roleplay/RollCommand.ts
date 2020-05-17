import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class RollCommand extends Command {
  public constructor() {
    super("Roll", {
      aliases: ["roll"],
      category: "Roleplay",
      description: {
        content: "Role até 25 dados. perfeito para aquele RP de mesa.",
        usage: "roll",
        examples: ["roll","roll -quantity={n}"]
      },
      ratelimit: 3,
      args: [
        {
          id: "quantity",
          type: (_: Message, str: string): null | Number => {
            if(str && !isNaN(Number(str)) && Number(str) > 0 && Number(str) <= 25 ) return Number(str);
            return null;
          },
          match: "text",
          flag: ["-quantity="],
          default: 1
        }
      ]
    });
  }

  public exec(msg: Message, { quantity }): Promise<Message|any> {
    const rollDice = () => Math.random() * 6;
    const dices = [];
    for(let i = 0; i < quantity; i++) {
      dices[i] = Math.floor(rollDice()+1);
    }
    const total = dices.reduce((prev, current) => prev + current);
    const embed = getMessage(msg)
      .setTitle('Dados')
      .setDescription(`Total: ${total}`);
    dices.map((dice, i) => embed.addField(`${i+1}º Dado`, dice, true));
    return msg.util.send(embed);
  }
}
