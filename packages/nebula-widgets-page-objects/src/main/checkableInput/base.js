import Input from "../input";

export default class CheckableInputBase extends Input {
  static bemBase = "";
  static displayName = "nw-CheckableInputBase";

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      labelShrinked: { simple: true, writable: false },
      widget: { simple: false, writable: false }
    });
  }

  /**
   * Returns 'LabelShrinked' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getLabelShrinked() {
    return this.getStatePartHelper("labelShrinked", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Widget' part of page object's state.
   *
   * @returns {Promise<string>}
   */
  async getWidget() {
    return this.getStatePartHelper("widget", {
      defaultValue: "checkbox",
      simple: false,
      src: "bemModifier"
    });
  }
}
