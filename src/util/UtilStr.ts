import * as util from "util";

/**
 * @public
 * @param {string} content
 * @returns {string}
 * @description Convert first character to lowercase
 * @example
 * lcFirst('Hello') // hello
 */
export const lcFirst = (content: string): string => {
    return content.charAt(0).toLowerCase() + content.slice(1);
};

/**
 * @public
 * @param {string} content
 * @returns {string}
 * @description Convert first character to uppercase
 * @example
 * ucFirst('hello') // Hello
 */
export const ucFirst = (content: string): string => {
    return content.charAt(0).toUpperCase() + content.slice(1);
};

/**
 * @public
 * @param {string} eventName
 * @returns {string}
 * @description Convert event name to formal name
 * @example
 * formalizeEventName('MessageCreateEvent') // messageCreate
 */
export const formalizeEventName = (eventName: string): string => {
    return lcFirst(eventName.replace('Event', ''));
};

/**
 * @public
 * @param {string} file
 * @returns {boolean}
 * @description Check if file is script file
 * @example
 * isScriptFile('index.js') // true
 * isScriptFile('index.ts') // true
 * isScriptFile('index.txt') // false
 */
export const isScriptFile = (file: string): boolean => {
    return file.endsWith('.js') || file.endsWith('.ts');
};

/**
 * @public
 * @param {number} num
 * @return {string}
 * @description Add leading zero to number
 * @example
 * leadingZero(1) // 01
 * leadingZero(10) // 10
 */
export const leadingZero = (num: number): string => {
    return num < 10 ? util.format('0%s', num) : num.toString();
};