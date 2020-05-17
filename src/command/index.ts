import { Command as Cmd, CommandOptions } from "discord-akairo";
import { Message as Msg } from 'discord.js';
import NPC from '../client';

export interface Message extends Msg {
  client: NPC
}

export class Command extends Cmd {
  public constructor(id: string, options: CommandOptions) {
    super(id, options);
  }

  public async exec(message: Message, args?: any): Promise<Message|any> {
    super.exec(message, args);
  }
}
