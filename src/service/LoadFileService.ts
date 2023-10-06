import type Client from '../client';
import * as fs from 'fs';
import * as path from 'path';
import { formalizeEventName, isScriptFile } from '../util/UtilStr';
import * as util from 'util';
import AbstractEvent from '../abstract/AbstractEvent';
import AppException from '../exception/AppException';
import UtilLogger from '../util/UtilLogger';
import AbstractCommand from '../abstract/AbstractCommand';
import { SharedNameAndDescription } from '@discordjs/builders';

/**
 * @class LoadFileService
 */
export default class LoadFileService {
  public client: Client<false>;

  /**
   * @constructor
   * @param {client} client
   */
  public constructor(client: Client<false>) {
    this.client = client;
  }

  /**
   * Search in folder
   * @param folderPath
   * @returns {Promise<any>}
   */
  public async searchInFolder(folderPath: string): Promise<any> {
    for (const file of fs.readdirSync(folderPath)) {
      const filePath = path.resolve(folderPath, file);

      if (fs.statSync(filePath).isDirectory())
        await this.searchInFolder(filePath);
      await this.loadFile(filePath);
    }
  }

  /**
   * Load a file
   * @param {string} filePath
   * @returns {Promise<any>}
   */
  public async loadFile(filePath: string): Promise<any> {
    // Ignore if file is not a script file (.js) or (.ts)
    if (!isScriptFile(filePath)) return;

    const fileName = path.parse(filePath).name;
    const { default: Action } = await import(filePath);

    const event = new Action(this.client);
    if (event.constructor.name !== fileName) {
      throw new AppException(
        util.format(
          'The file %s and its class name are not identical',
          fileName
        )
      );
    }

    if (event instanceof AbstractEvent) {
      await this.loadEvent(fileName, event, Action);
    } else if (event instanceof AbstractCommand) {
      await this.loadCommand(fileName, event, Action);
    }

    console.log(util.format('Loaded %s', fileName));
  }

  /**
   * Load an event
   * @param {string} fileName
   * @param {AbstractEvent} event
   * @param {() => AbstractEvent} Action
   * @returns {Promise<any>}
   * @private
   */
  private async loadEvent(
    fileName: string,
    event: AbstractEvent,
    Action: () => AbstractEvent
  ): Promise<any> {
    if (this.client.events.has(fileName)) {
      throw new AppException(
        util.format('The event %s is already registered', fileName)
      );
    }

    this.client.events.set(fileName, Action);

    this.client.on(formalizeEventName(fileName), (...args) => {
      if (!UtilLogger.DISABLE_EVENT_LOG.includes(fileName)) {
        UtilLogger.event(util.format('%s called', fileName));
      }
      void event.run(...args);
    });
  }

  /**
   * Load a command
   * @param {string} fileName
   * @param {AbstractCommand} command
   * @param {() => AbstractCommand} Action
   * @private
   */
  private async loadCommand(
    fileName: string,
    command: AbstractCommand,
    Action: () => AbstractCommand
  ): Promise<any> {
    command.alias.forEach((name) => {
      if (this.client.commands.has(name)) {
        throw new AppException(
          util.format('The command %s is already registered', fileName)
        );
      }

      if (command.slash) {
        this.client.application_commands.push(
          new SharedNameAndDescription()
            .setName(name)
            .setDescription(command.description)
        );
      }

      const hasCommand = this.client.categories.get(command.category) ?? [];
      this.client.categories.set(
        command.category,
        hasCommand.concat([command.alias[0]])
      );

      this.client.commands.set(name, Action);
    });
  }
}
