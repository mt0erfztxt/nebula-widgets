import Input from "../input";

export default class GroupInputBase extends Input {
  static bemBase = "";
  static displayName = "nw-GroupInputBase";

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      columns: { simple: false, writable: false },
      equidistant: { simple: true, writable: false },
      inline: { simple: true, writable: false },
      noRowGap: { simple: true, writable: false },
      softColumns: { simple: true, writable: false },
      stackedOnMobile: { simple: true, writable: false }
    });
  }

  /**
   * Returns 'Columns' part of page object's state.
   *
   * @returns {Promise<string | undefined>}
   */
  async getColumns() {
    return this.getStatePartHelper("columns", {
      simple: false,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Equidistant' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getEquidistant() {
    return this.getStatePartHelper("equidistant", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'Inline' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getInline() {
    return this.getStatePartHelper("inline", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'NoRowGap' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getNoRowGap() {
    return this.getStatePartHelper("noRowGap", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'SoftColumns' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getSoftColumns() {
    return this.getStatePartHelper("softColumns", {
      simple: true,
      src: "bemModifier"
    });
  }

  /**
   * Returns 'StackedOnMobile' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getStackedOnMobile() {
    return this.getStatePartHelper("stackedOnMobile", {
      simple: true,
      src: "bemModifier"
    });
  }
}
