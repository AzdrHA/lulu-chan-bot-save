import AbstractAction from './AbstractAction';
import type Client from '../client';
import {
  type BaseMessageOptions,
  ChatInputCommandInteraction,
  type Interaction,
  Message
} from 'discord.js';
import { type ECommandCategory } from '../enum/ECommandCategory';

/**
 * @abstract
 * @class AbstractCommand
 * @extends AbstractAction
 */
export default abstract class AbstractCommand extends AbstractAction {
  public command: string;
  public args: string[];
  private readonly message: Message<true> | Interaction;

  public abstract alias: string[];
  public abstract description: string;
  public abstract slash: boolean;
  public abstract category: ECommandCategory;

  /**
   * @constructor
   * @param {Client<true>} client
   * @param message
   * @param {string} command
   * @param {string[]} args
   * @protected
   */
  protected constructor(
    client: Client<true>,
    message: Message<true> | Interaction,
    command: string,
    args: string[]
  ) {
    super(client);
    this.command = command;
    this.args = args;
    this.message = message;
  }

  public abstract run(message: Message<true>): Promise<any>;

  /**
   * @public
   * @param {BaseMessageOptions} options
   * @returns {Promise<Message>}
   */
  public async reply(options: BaseMessageOptions): Promise<any> {
    if (this.message instanceof ChatInputCommandInteraction) {
      return await this.message.reply(options);
    } else if (this.message instanceof Message) {
      options.allowedMentions ??= { repliedUser: false };
      return await this.message.reply(options);
    } else {
      throw new Error('Message is not a Message or Interaction');
    }
  }
}
