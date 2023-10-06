import { Client as BaseClient, Collection } from 'discord.js';
import { type IClientOptions } from './interface/IClientOptions';
import { type SharedNameAndDescription } from '@discordjs/builders';

/**
 * @class Client
 * @extends BaseClient
 */
export default class Client<Ready extends boolean> extends BaseClient<Ready> {
  public prefixes: string[];
  public commands: Collection<any, any>;
  public application_commands: SharedNameAndDescription[];
  public events: Collection<any, any>;

  /**
   * @constructor
   * @param {IClientOptions} options
   */
  public constructor(options: IClientOptions) {
    super(options);
    this.prefixes = options.prefixes;
    this.commands = new Collection();
    this.application_commands = [];
    this.events = new Collection();
  }
}
