import PageObject from "nebula-test-fragment/lib/main/pageObject";

/**
 * Class representing page object for man page's interactive example widget.
 */
export default class InteractiveExample extends PageObject {
  static bemBase = "manPage-interactiveExample";
  static displayName = "ManPage.InteractiveExample";

  /**
   * @type {BemBase}
   */
  #viewElementBemBase;

  /**
   * @type {Selector}
   */
  #viewElementSelector;

  /**
   * BEM base for example's 'view' element.
   *
   * @returns {BemBase}
   */
  get viewElementBemBase() {
    if (!this.#viewElementBemBase) {
      this.#viewElementBemBase = this.bemBase.clone().setElt("view");
    }

    return this.#viewElementBemBase;
  }

  /**
   * TestCafe selector for example's 'view' element.
   *
   * @returns {Selector}
   */
  get viewElementSelector() {
    if (!this.#viewElementSelector) {
      this.#viewElementSelector = this.selector.find(
        this.viewElementBemBase.toQuerySelector()
      );
    }

    return this.#viewElementSelector;
  }
}
