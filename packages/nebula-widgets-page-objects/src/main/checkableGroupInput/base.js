import GroupInput from "../groupInput";

export default class CheckableGroupInputBase extends GroupInput {
  static bemBase = "";
  static displayName = "nw-CheckableGroupInputBase";

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      multiCheckable: { simple: true, writable: false }
    });
  }

  /**
   * Returns 'MultiCheckable' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getMultiCheckable() {
    return this.getStatePartHelper("multiCheckable", {
      simple: true,
      src: "bemModifier"
    });
  }
}
