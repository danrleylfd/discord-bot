import { Command, Message } from '../../command';
import getMessage from '../../utils/getMessage';
import axios from 'axios';

export default class Covid19Command extends Command {
  public constructor() {
    super("Covid", {
      aliases: ["covid19","covid","corona","coronavirus","cov","cov19"],
      category: "Health",
      description: {
        content: "Checa estatísticas sobre a Covid-19.",
        usage: "covid",
        examples: ["covid"]
      },
      ratelimit: 3,
      args: [
        {
          id: "type",
          type: (_: Message, str: string): null | string => {
            if(!!str && ["world","continents","countries"].includes(str.toLowerCase())) return str;
            return null;
          },
          match: "option",
          flag: ["-type="],
          default: "world"
        },
        {
          id: "local",
          type: (_: Message, str: string): null | string => {
            if(!!str) return str;
            return null;
          },
          match: "option",
          flag: ["-local="],
          default: null
        },
        {
          id: "yesterday",
          type: (_: Message, str: string): null | boolean => {
            if(!!str) return true;
            return null;
          },
          match: "flag",
          flag: ["-yesterday"],
          default: null
        }
      ]
    });
  }

  public async exec(msg: Message, { type, local, yesterday }): Promise<Message|any> {
    const api = axios.create({ baseURL: 'https://corona.lmao.ninja/v2' });
    const embed = getMessage(msg);
    if(type === 'world') {
      const { data: world } = await api.get(`/all?yesterday=${yesterday}`);
      embed.setTitle('Mundo');
      embed.addField('Testes Realizados', world.tests, true);
      embed.addField('Casos Totais', world.cases, true);
      embed.addField('Casos Hoje', world.todayCases, true);
      embed.addField('Casos Ativos', world.active, true);
      embed.addField('Casos Recuperados', world.recovered, true);
      embed.addField('Casos Graves', world.critical, true);
      embed.addField('Casos de Mortes', world.deaths, true);
      embed.addField('Mortes Hoje', world.todayDeaths, true);
      embed.addField('Lugares Afetados', world.affectedCountries, true);
    } else if(type === 'continents') {
      const { data: continent } = await api.get(`/continents/${local || "South America"}?yesterday=${yesterday}`);
      embed.setTitle(continent.continent);
      embed.addField('Casos Totais', continent.cases, true);
      embed.addField('Casos Hoje', continent.todayCases, true);
      embed.addField('Casos Ativos', continent.active, true);
      embed.addField('Casos Recuperados', continent.recovered, true);
      embed.addField('Casos Graves', continent.critical, true);
      embed.addField('Casos de Mortes', continent.deaths, true);
      embed.addField('Mortes Hoje', continent.todayDeaths, true);
    } else if(type === 'countries') {
      const { data: country } = await api.get(`/countries/${local || "Brazil"}?yesterday=${yesterday}`);
      embed.setTitle(country.country);
      embed.addField('Testes Realizados', country.tests, true);
      embed.addField('Casos Totais', country.cases, true);
      embed.addField('Casos Hoje', country.todayCases, true);
      embed.addField('Casos Ativos', country.active, true);
      embed.addField('Casos Recuperados', country.recovered, true);
      embed.addField('Casos Graves', country.critical, true);
      embed.addField('Casos de Mortes', country.deaths, true);
      embed.addField('Mortes Hoje', country.todayDeaths, true);
    }
    return msg.util.send(embed);
  }
}
