import type Client from '../client';

/**
 * @abstract
 * @class AbstractAction
 */
export default abstract class AbstractAction {
  public client: Client<true>;

  /**
   * @constructor
   * @param {Client} client
   * @protected
   */
  public constructor(client: Client<true>) {
    this.client = client;
  }
}
