import PageObject from "nebula-test-fragment/lib/main/pageObject";
import Example from "./example";

/**
 * Class representing page object for man page widget.
 */
export default class ManPage extends PageObject {
  static bemBase = "manPage";
  static displayName = "ManPage";

  /**
   * Returns page object for man page's example widget.
   *
   * @param {NTF.PageObjectConstructorParams} args
   * @returns {Example}
   */
  getExample(...args) {
    return this.getPageObjectHelper(Example, ...args);
  }
}
