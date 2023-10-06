import AbstractEvent from '../../abstract/AbstractEvent';
import { type Interaction } from 'discord.js';
import type AbstractCommand from '../../abstract/AbstractCommand';

/**
 * @class InteractionCreateEvent
 */
export default class InteractionCreateEvent extends AbstractEvent {
  /**
   * @public
   * @returns {void}
   */
  public async run(interaction: Interaction): Promise<any> {
    if (!interaction.isChatInputCommand()) return false;

    // check if command exists
    const command = this.client.application_commands.find(
      (command) => command.name === interaction.commandName
    );
    if (command == null) return false;

    let Command = this.client.commands.get(interaction.commandName);

    // if the command is not found, return false
    if (Command == null) return false;

    // create a new instance of the command
    Command = new Command(
      this.client,
      interaction,
      interaction.commandName,
      []
    ) as AbstractCommand;

    // run the command
    return Command.run();
  }
}
