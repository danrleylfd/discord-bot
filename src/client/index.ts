import {
  AkairoClient,
  CommandHandler,
  ListenerHandler as EventHandler,
  InhibitorHandler
} from "discord-akairo";
import { User, Message, Collection } from "discord.js";
import { join } from "path";
import { prefix, owner } from '../../env';
import Connection, { mongooseOptions } from '../database';
import Guild from '../database/Guild';
import { VoiceConnection, VoiceBroadcast, StreamDispatcher } from "discord.js";
import { downloadOptions } from "ytdl-core";

export type Player = {
  connection: VoiceConnection;
  voiceBroadcast: VoiceBroadcast|any;
  dispatcher: StreamDispatcher;
  videoID: string;
  videoURL: string;
  stopped?: boolean;
  repeat?: boolean;
  replay?: boolean;
  info: {
    author: {
      name: string,
      avatar: string,
      url: string
    },
    thumbnail: string,
    title: string
  };
};

declare module "discord-akairo" {
  interface NPCClient {
    commandHandler: CommandHandler;
    eventHandler: EventHandler;
    inhibitorHandler: InhibitorHandler;
    database: any;
    models?: any;
    iam?: string;
    players?: Collection<string, Player>;
    readonly voiceOptions: downloadOptions;
  }
}

interface NPCClientOptions {
  token?: string;
  npcID?: string;
  npcSecret?: string;
  npcUsername?: string;
  owner?: string;
  prefix?: string;
  embedColor?: string;
  mongoDB_Host?: string;
  imgurClientID?: string;
  imgurClientSecret?: string;
}

export default class NPC extends AkairoClient {
  public config!: NPCClientOptions;
  public database!: any;
  public models!: any;
  public iam?: string;
  public players?: Collection<string, Player> = new Collection();
  public readonly voiceOptions: downloadOptions = {
    filter: 'audioonly',
    quality: 'lowestaudio',
    highWaterMark: 32*1024*1024
  };
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "commands"),
    automateCategories: true,
    prefix: prefix,
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,//300k ms
    defaultCooldown: 3e3,//3k ms
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string => `${str}\n\nEscreva \`cancelar\` para cancelar o comando...`,
        modifyRetry: (_: Message, str: string): string => `${str}\n\nEscreva \`cancelar\` para cancelar o comando...`,
        timeout: "Tempo esgotado.",
        ended: "Você excedeu o número máximo de tentativas, este comando será cancelado.",
        cancel: "Este comando foi cancelado.",
        retries: 3,
        time: 3e4
      },
      otherwise: ""
    },
    ignorePermissions: owner
  });
  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, "..", "inhibitors"),
  });
  public eventHandler: EventHandler = new EventHandler(this, {
    directory: join(__dirname, "..", "events"),
  });
  public constructor(config: NPCClientOptions) {
    super({ ownerID: config.owner });
    this.config = config;
  }
  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.eventHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.eventHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      eventHandler: this.eventHandler,
      process
    });
    this.inhibitorHandler.loadAll();
    this.eventHandler.loadAll();
    this.commandHandler.loadAll();
    const options: mongooseOptions = {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    } 
    this.database = await Connection(this.config.mongoDB_Host, options);
    this.models = { Guild };
  }
  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }
}
