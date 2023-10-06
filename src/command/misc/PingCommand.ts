import { type Message } from 'discord.js';
import AbstractCommand from '../../abstract/AbstractCommand';
import { ECommandCategory } from '../../enum/ECommandCategory';

/**
 * @class PingCommand
 * @extends AbstractCommand
 */
export default class PingCommand extends AbstractCommand {
  public alias: string[] = ['ping'];
  public description: string = 'Ping!';
  public slash: boolean = true;
  public category: ECommandCategory = ECommandCategory.MISC;

  /**
   * @public
   * @returns {Promise<Message>}
   */
  public async run(): Promise<Message> {
    return await this.reply({ content: 'Pong!' });
  }
}
