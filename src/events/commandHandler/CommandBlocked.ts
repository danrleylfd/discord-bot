import { Listener as Event } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '../../command';

export default class CommandBlockedEvent extends Event {
  public constructor() {
    super("blocked", {
      emitter: "commandHandler",
      event: "commandBlocked",
      category: "commandHandler"
    });
  }
  public exec(msg: Message, command: Command, reason: string): void {
    console.log(`${msg.author.username} foi bloqueado ao usar o comando ${command.id} por que ${reason}!`);
  }
}
