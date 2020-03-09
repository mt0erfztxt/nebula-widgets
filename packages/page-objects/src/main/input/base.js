import PageObject from "nebula-test-fragment/lib/main/pageObject";

export default class InputBase extends PageObject {
  static bemBase = "";
  static displayName = "nw-InputBase";

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      disabled: { simple: true, writable: false },
      invalid: { simple: true, writable: false },
      size: { simple: false, writable: false },
      widget: { simple: false, writable: false }
    });
  }

  /**
   * Returns 'Disabled' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getDisabled() {
    return this.getStatePartHelper("disabled", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Invalid' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getInvalid() {
    return this.getStatePartHelper("invalid", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Size' part of page object's state.
   *
   * @returns {Promise<string>}
   */
  async getSize() {
    return this.getStatePartHelper("size", {
      defaultValue: "normal",
      simple: false,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Widget' part of page object's state.
   *
   * @returns {Promise<string | undefined>}
   */
  async getWidget() {
    return this.getStatePartHelper("widget", {
      simple: false,
      src: "bemModifier"
    });
  }
}
