import AbstractEvent from '../../abstract/AbstractEvent';
import { type Message } from 'discord.js';
import type AbstractCommand from '../../abstract/AbstractCommand';

/**
 * @class MessageCreateEvent
 */
export default class MessageCreateEvent extends AbstractEvent {
  /**
   * @public
   * @returns {void}
   */
  public async run(message: Message): Promise<any> {
    // if the message is from a bot, return false
    if (message.author.bot) return false;

    // create a new array with the prefixes and the mention of the bot
    const prefixes = [
      ...this.client.prefixes,
      `<@${this.client.user.id}>`,
      `<@!${this.client.user.id}>`
    ];

    // find the prefix used by the user
    const prefix = prefixes.find((prefix) =>
      message.content.toLowerCase().startsWith(prefix)
    );

    // if the prefix is not found, return false
    if (prefix == null) return false;

    // get the command name and the arguments
    const [commandName, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    // get the command from the command name
    let Command = this.client.commands.get(commandName.toLowerCase());

    // if the command is not found, return false
    if (Command == null) return false;

    // create a new instance of the command
    Command = new Command(
      this.client,
      message,
      commandName,
      args
    ) as AbstractCommand;

    // run the command
    return Command.run(message);
  }
}
