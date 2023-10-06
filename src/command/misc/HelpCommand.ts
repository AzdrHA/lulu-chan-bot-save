import { EmbedBuilder, type Message, type APIEmbedField } from 'discord.js';
import AbstractCommand from '../../abstract/AbstractCommand';
import { ECommandCategory } from '../../enum/ECommandCategory';
import UtilArray from '../../util/UtilArray';
import * as util from 'util';

/**
 * @class HelpCommand
 * @extends AbstractCommand
 */
export default class HelpCommand extends AbstractCommand {
  public alias: string[] = ['help'];
  public description: string = 'Help';
  public slash: boolean = true;
  public category: ECommandCategory = ECommandCategory.MISC;

  private readonly titles: Record<ECommandCategory, string> = {
    [ECommandCategory.MISC]: util.format(
      ':file_folder: %s',
      this.client.translation('Miscellaneous')
    )
  };

  private readonly commandConfig: Record<ECommandCategory, number> = {
    [ECommandCategory.MISC]: 0
  };

  /**
   * @public
   * @returns {Promise<Message>}
   */
  public async run(): Promise<Message> {
    const fields = this.client.categories.reduce(
      (acc: APIEmbedField[], commands, category) => {
        acc[this.commandConfig[category]] = {
          name: this.titles[category],
          value: UtilArray.join(commands, ', ', '`')
        };
        return acc;
      },
      []
    );

    return await this.reply({
      embeds: [
        new EmbedBuilder({
          fields: fields.reverse()
        })
      ]
    });
  }
}
