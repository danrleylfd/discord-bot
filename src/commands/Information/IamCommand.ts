import { Command, Message } from '../../command';
import { MessageReaction } from 'discord.js';
import getMessage from '../../utils/getMessage';

export default class IamCommand extends Command {
  public constructor() {
    super("Iam", {
      aliases: ["iam"],
      category: "Information",
      description: {
        content: "Lista os cargos auto atribuíveis.",
        usage: "iam",
        examples: ["iam"]
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|MessageReaction|any> {
    if(msg.guild.id !== "708820508342354021") return;
    const embed = getMessage(msg)
      .setDescription('\🎮| Gamer\n\🎧| Hipster\n\💻| Geek\n\📚| Nerd\n🥺| Otaku\n🟡 Amarelo\n🔵 Azul\n⚪ Branco\n🟣 Índigo\n🟠 Laranja\n🟤 Marrom\n🟢 Verde\n🔴 Vermelho');
    const _msg = await msg.util.send(embed);
    msg.client.iam = _msg.id;
    await _msg.react('🎮');
    await _msg.react('🎧');
    await _msg.react('💻');
    await _msg.react('📚');
    await _msg.react('🥺');
    await _msg.react('🟡');
    await _msg.react('🔵');
    await _msg.react('⚪');
    await _msg.react('🟣');
    await _msg.react('🟠');
    await _msg.react('🟤');
    await _msg.react('🟢');
    return _msg.react('🔴');
  }
}
