import { type Message } from 'discord.js';
import AbstractCommand from '../../abstract/AbstractCommand';

/**
 * @class PingCommand
 * @extends AbstractCommand
 */
export default class PingCommand extends AbstractCommand {
  public alias: string[] = ['ping'];
  public description: string = 'Ping!';
  public slash: boolean = true;

  /**
   * @public
   * @returns {Promise<Message>}
   */
  public async run(): Promise<Message> {
    return await this.reply({ content: 'Pong!' });
  }
}
