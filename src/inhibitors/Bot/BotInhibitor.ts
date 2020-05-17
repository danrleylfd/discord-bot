import { Message } from "discord.js";
import { Inhibitor } from 'discord-akairo';

export default class BotInhibitor extends Inhibitor {
  public constructor() {
    super("bot", {
      reason: "ele é um bot"
    });
  }
  public exec(msg: Message): boolean {
    return msg.author.bot;
  }
}
