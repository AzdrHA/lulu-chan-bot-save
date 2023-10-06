import AbstractAction from "./AbstractAction";

/**
 * @class AbstractEvent
 */
export default abstract class AbstractEvent extends AbstractAction {
    public abstract run(...args: any[]): Promise<any>;
}