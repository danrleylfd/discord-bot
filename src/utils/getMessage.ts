import { Message, MessageEmbed } from 'discord.js';
import NPC from '../client';

export default function getMessage(msg: Message) {
  const client: NPC = Object.assign(msg.client);
  if(msg === null) {
    const embed: MessageEmbed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setFooter(client.user.tag, client.user.displayAvatarURL({ size: 4096 }));
    return embed;
  }
  const displayHexColor = (msg.member.displayHexColor === "#000000") ? undefined : msg.member.displayHexColor;
  const embed: MessageEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ size: 4096 }))
    .setColor(displayHexColor || client.config.embedColor)
    .setTimestamp(Date.now())
    .setFooter(msg.client.user.tag, client.user.displayAvatarURL({ size: 4096 }));
  return embed;
}
