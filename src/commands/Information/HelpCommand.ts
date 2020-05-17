import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';
import NPC from '../../client';

export default class HelpCommand extends Command {
  public constructor() {
    super("Help", {
      aliases: ["help","ajuda"],
      category: "Information",
      description: {
        content: "Checa informações úteis sobre mim.",
        usage: "help <Categoria|Comando>",
        examples: ["help","help Information","help Avatar"]
      },
      ratelimit: 3,
      args: [
        {
          id: "cmd",
          match: "text",
          default: undefined
        }
      ]
    });
  }

  public exec(msg: Message, { cmd }): Promise<Message|any> {
    const client: NPC = Object.assign(msg.client);
    const embed = getMessage(msg);
    if(!cmd){
      const mapFn0 = ({id}) => { return { id, commands: client.commandHandler.modules.filter(({categoryID}) => categoryID === id)} };
      const mapFn1 = ({id,commands}) => embed.addField(id, `> ${commands.map(command => `\`${command.id}\``).join(', ')}`);
      const commandsByCategories = client.commandHandler.categories.map(mapFn0);
      commandsByCategories.map(mapFn1);
      embed.setTitle(this.id);
    }else if(client.commandHandler.modules.filter(command => command.categoryID === cmd).array().length > 0) {
      const filterFn = ({categoryID}) => categoryID === cmd;
      const mapFn = command => embed.addField(command.id, `> ${command.description.content}`);
      client.commandHandler.modules.filter(filterFn).map(mapFn);
      embed.setTitle(cmd);
    }else{
      const mapFn = label => `> f!${label}`;
      const command = client.commandHandler.findCommand(cmd);
      embed
        .setTitle(command.id)
        .addField('Descrição:', `> ${command.description.content}`)
        .addField('Uso:', `> f!${command.description.usage}`)
        .addField('Exemplos:', command.description.examples.map(mapFn).join('\n'))
        .addField('Aliases:', `> [${command.aliases.sort().join(', ')}]`);
    }
    return msg.util.send(embed);
  }
}
