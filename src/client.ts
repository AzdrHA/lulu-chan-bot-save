import { Client as BaseClient, Collection } from 'discord.js';
import { type IClientOptions } from './interface/IClientOptions';
import { type SharedNameAndDescription } from '@discordjs/builders';
import { type ECommandCategory } from './enum/ECommandCategory';
import * as path from 'path';
import { I18n, type TranslateOptions } from 'i18n';

/**
 * @class Client
 * @extends BaseClient
 */
export default class Client<Ready extends boolean> extends BaseClient<Ready> {
  public prefixes: string[];
  public commands: Collection<any, any>;
  public application_commands: SharedNameAndDescription[];
  public events: Collection<any, any>;
  public categories: Collection<ECommandCategory, string[]>;
  private readonly i18n: I18n;

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
    this.categories = new Collection();

    this.i18n = new I18n({
      locales: ['en', 'fr'],
      defaultLocale: 'en',
      directory: path.join(__dirname, 'translations')
    });
  }

  /**
   * @param {string | TranslateOptions} key
   * @param {any} options
   * @returns {string}
   */
  public translation = (
    key: string | TranslateOptions,
    options: any[] = []
  ): string => {
    return this.i18n.__mf(key, options);
  };
}
