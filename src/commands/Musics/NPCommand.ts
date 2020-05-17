import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';

export default class NowPlayingCommand extends Command {
  public constructor() {
    super("NowPlaying", {
      aliases: ["nowplaying","np"],
      category: "Musics",
      description: {
        content: "Exibe informações sobre a música que está tocando.",
        usage: "nowplaying",
        examples: ["nowplaying"],
      },
      ratelimit: 3
    });
  }

  public async exec(msg: Message): Promise<Message|any> {
    const player = msg.client.players.get(msg.guild.id);
    if(!player) return msg.util.send('Você está ouvindo coisas? Não há nada tocando no momento!');
    const embed = getMessage(msg)
      .setAuthor(player.info.author.name,player.info.author.avatar,player.info.author.url)
      .setThumbnail(player.info.thumbnail)
      .setTitle(player.info.title);
    return msg.util.send(embed);
  }
}
