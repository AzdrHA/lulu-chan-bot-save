/**
 * UtilArray
 * @class UtilArray
 * @abstract
 */
class UtilsArrayInstance {
  /**
   * @param {string[]} arr
   * @param {string} sep
   * @param {string} enter
   * @return {string}
   */
  public join = (arr: string[], sep: string, enter: string = ''): string => {
    let res = '';
    for (let i = 0; i < arr.length; i++) {
      res += enter + arr[i] + enter;
      if (i !== arr.length - 1) res += sep;
    }
    return res;
  };
}

const UtilArray = new UtilsArrayInstance();
export default UtilArray;
