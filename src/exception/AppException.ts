/**
 * @class AppException
 * @extends Error
 */
export default class AppException extends Error {
    /**
     * @constructor
     * @param {string} message
     */
    public constructor(message: string = 'An error has been detected') {
        super(message);
    }
}