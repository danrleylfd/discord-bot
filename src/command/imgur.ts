import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import api from '../services/imgur';

export default class ImgurCommand extends Command {
  public constructor(id, options={}) {
    super(id, options);
  }

  public async exec(_: Message, args?: any): Promise<Message|string|any> {
    const { label } = args;
    const url = (this.categoryID === 'Roleplay') ? `/gallery/search/?q=anime ${label}` : `/gallery/search/?q=${label}`;
    const { data: { data: _albuns } } = await api.get(url);
    const albuns = _albuns.filter(album => !album.nsfw).filter(album => !!album.is_album).map(album => album.images);
    const posAlbum = Math.floor(Math.random() * albuns.length);
    const album = albuns[posAlbum];
    const posImage = Math.floor(Math.random() * album.length);
    const image = album[posImage].link;
    return image;
  }
}
