import AbstractEvent from "../abstract/AbstractEvent";

/**
 * @class ReadyEvent
 */
export default class ReadyEvent extends AbstractEvent {
    /**
     * @public
     * @returns {void}
     */
    public async run(): Promise<any> {
        console.log('\nLogged in as', this.client.user?.tag);
    }
}