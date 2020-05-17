import { Listener as Event } from 'discord-akairo';
import { ActivityOptions } from 'discord.js';

export default class ReadyEvent extends Event {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client"
    });
  }
  public async exec(): Promise<void> {
    const presences: Array<ActivityOptions> = [
      { name: 'NieR:Automata', type: 'PLAYING', url: 'https://www.niergame.com' },
      { name: 'Brawlhalla', type: 'PLAYING', url: 'https://www.brawlhalla.com' },
      { name: 'Mobile Legends', type: 'PLAYING', url: 'https://m.mobilelegends.com' },
      { name: 'League Of Legends', type: 'PLAYING', url: 'https://leagueoflegends.com' },
      { name: 'Covid-19', type: 'STREAMING', url: 'https://www.twitch.tv/danrleydfl' },
      { name: 'Dream Animes', type: 'WATCHING', url: 'https://www.dreamanimes.com.br' },
      { name: 'Anihub', type: 'WATCHING', url: 'https://anihub.tv' }
    ];
    const pos = Math.floor(Math.random() * presences.length);
    // const pos = presences[presences.length-1];
    await this.client.user.setActivity(presences[pos]);
  }
}
