import PageObject from "nebula-test-fragment/lib/main/pageObject";

/**
 * Class representing page object for man page's example widget.
 */
export default class Example extends PageObject {
  static bemBase = "manPage-example";
  static displayName = "ManPage.Example";

  /**
   * @type {BemBase}
   */
  #titleElementBemBase;

  /**
   * @type {Selector}
   */
  #titleElementSelector;

  /**
   * BEM base for example's 'title' element.
   *
   * @returns {BemBase}
   */
  get titleElementBemBase() {
    if (!this.#titleElementBemBase) {
      this.#titleElementBemBase = this.bemBase.clone().setElt("title");
    }

    return this.#titleElementBemBase;
  }

  /**
   * TestCafe selector for example's 'title' element.
   *
   * @returns {Selector}
   */
  get titleElementSelector() {
    if (!this.#titleElementSelector) {
      this.#titleElementSelector = this.selector.find(
        this.titleElementBemBase.toQuerySelector()
      );
    }

    return this.#titleElementSelector;
  }

  getStateSpec() {
    return Object.assign(super.getStateSpec(), {
      title: false
    });
  }

  /**
   * Returns 'Title' part of page object's state.
   *
   * @returns {Promise<string>}
   */
  async getTitle() {
    return this.titleElementSelector.textContent;
  }
}
