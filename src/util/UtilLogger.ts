import chalk from 'chalk';
import * as util from 'util';
import { leadingZero } from './UtilStr';

/**
 * @class BaseUtilLogger
 */
class BaseUtilLogger {
    public DISABLE_EVENT_LOG = ['MessageCreateEvent'];
    /**
     * @public
     * @static
     * @return {string}
     */
    readonly dateFormat = (): string => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = leadingZero(date.getHours());
        const minutes = leadingZero(date.getMinutes());
        const seconds = leadingZero(date.getSeconds());
        return chalk.gray(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`);
    };

    /**
     * @public
     * @static
     * @param {string} type
     * @param {string} message
     */
    public log = (type: string, message: string): void => {
        console.log(util.format('[%s] %s : %s', type, this.dateFormat(), message));
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public info = (message: string): void => {
        const info = chalk.cyan('INFO');
        this.log(info, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public success = (message: string): void => {
        const success = chalk.green('SUCCESS');
        this.log(success, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public event = (message: string): void => {
        const event = chalk.magenta('EVENT');
        this.log(event, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public command = (message: string): void => {
        const command = chalk.yellow('COMMAND');
        this.log(command, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public interaction = (message: string): void => {
        const interaction = chalk.blue('INTERACTION');
        this.log(interaction, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public error = (message: string): void => {
        const error = chalk.red('ERROR');
        this.log(error, message);
    };

    /**
     * @public
     * @static
     * @param {string} message
     */
    public warn = (message: string): void => {
        const warn = chalk.yellow('WARN');
        this.log(warn, message);
    };

    public apiRequest = (message: string): void => {
        const apiRequest = chalk.blue('API REQUEST');
        this.log(apiRequest, message);
    };

    public cacheRequest = (message: string): void => {
        const cacheRequest = chalk.magenta('CACHE REQUEST');
        this.log(cacheRequest, message);
    };
}

const UtilLogger = new BaseUtilLogger();
export default UtilLogger;
