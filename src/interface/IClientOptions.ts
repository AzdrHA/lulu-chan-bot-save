import { type ClientOptions } from 'discord.js';

export interface IClientOptions extends ClientOptions {
  prefixes: string[];
  development: boolean;
}
