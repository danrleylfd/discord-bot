import { Message, MessageEmbed } from 'discord.js';

const embedPagination = async (msg: Message, pages: Array<MessageEmbed>, emojiList: Array<string> = ['🔁','⏮️','⏪','⏩','⏭️','🛑'], timeout: number = 120000): Promise<Message|void> => {
  if (!msg && !msg.channel) throw new Error('Channel is inaccessible.');
  if (!pages) throw new Error('Pages are not given.');
  if (emojiList.length !== 6) throw new Error('Need six emojis.');
  let page = 0;
  const curPage = await msg.util.send(pages[page].setFooter(`${pages[page].footer.text} | Página ${page + 1}/${pages.length}`, pages[page].footer.iconURL));
  for (const emoji of emojiList) await curPage.react(emoji);
  const reactionCollector = curPage.createReactionCollector(
    (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
    { time: timeout }
  );
  reactionCollector.on('collect', reaction => {
    switch (reaction.emoji.name) {
      case emojiList[0]:
        reactionCollector.resetTimer();
        break;
      case emojiList[1]:
        page = 0;
        break;
      case emojiList[2]:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case emojiList[3]:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case emojiList[4]:
        page = pages.length - 1;
        break;
      case emojiList[5]:
        reactionCollector.stop();
        break;
      default:
        break;
    }
    if(reactionCollector.ended) return curPage.delete();
    curPage.edit(pages[page].setFooter(`${pages[page].footer.text} | Página ${page + 1}/${pages.length}`, pages[page].footer.iconURL));
  });
  reactionCollector.on('end', ({..._}) => curPage.delete());
};
export default embedPagination;
