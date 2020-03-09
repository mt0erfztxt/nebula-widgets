import InputBase from "./base";

/**
 * Class representing page object for input widget.
 */
export default class Input extends InputBase {
  static bemBase = "";
  static displayName = "nebula-widgets.widgets.input";

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      value: { simple: false, writable: true }
    });
  }

  /**
   * Returns 'Value' part of page object's state.
   *
   * @returns {Promise<*>}
   */
  async getValue() {
    // Implementation differs for concrete input page object and so can not be
    // provided here.
    throw new Error(`${this.displayName}: getValue() not implemented`);
  }

  /**
   * Sets 'Value' part of page object's state.
   *
   * @param {*} value A new value for 'Value' part of page object's state.
   * @returns {Promise<void>}
   */
  async setValue(value) {
    // Implementation differs for concrete input page object and so can not be
    // provided here.
    throw new Error(`${this.displayName}: setValue() not implemented`);
  }
}
