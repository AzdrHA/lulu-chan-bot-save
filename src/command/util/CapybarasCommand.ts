import { type Message } from 'discord.js';
import AbstractCommand from '../../abstract/AbstractCommand';

/**
 * @class CapybarasCommand
 * @extends AbstractCommand
 */
export default class CapybarasCommand extends AbstractCommand {
  public alias: string[] = ['capybaras'];
  public description: string = 'send picture of Capybaras';
  public slash: boolean = true;

  /**
   * @public
   * @returns {Promise<Message>}
   */
  public async run(): Promise<Message> {
    return await this.reply({
      embeds: [
        {
          image: {
            url: 'https://gazettereview.com/wp-content/uploads/2016/08/Capybaras.jpg'
          }
        }
      ]
    });
  }
}
