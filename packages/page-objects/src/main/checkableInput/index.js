import is from "@sindresorhus/is";
import { Selector } from "testcafe";
import {
  isNonBlankString,
  typeAndValue
} from "nebula-test-fragment/lib/main/util";
import CheckableInputBase from "./base";

/**
 * Class representing page object for checkable input widget.
 */
export default class CheckableInput extends CheckableInputBase {
  static bemBase = "nw-checkableInput";
  static displayName = "nw-CheckableInput";

  /**
   * @type {BemBase}
   */
  #labelElementBemBase;

  /**
   * @type {Selector}
   */
  #labelElementSelector;

  /**
   * BEM base for input's 'label' element.
   *
   * @returns {BemBase}
   */
  get labelElementBemBase() {
    if (!this.#labelElementBemBase) {
      this.#labelElementBemBase = this.bemBase.clone().setElt("label");
    }

    return this.#labelElementBemBase;
  }

  /**
   * TestCafe selector for 'label' element.
   *
   * @returns {Selector}
   */
  get labelElementSelector() {
    if (!this.#labelElementSelector) {
      this.#labelElementSelector = this.selector.find(
        this.labelElementBemBase.toQuerySelector()
      );
    }

    return this.#labelElementSelector;
  }

  /**
   * Adds selector transformation aliases.
   * 1. 'checked' - boolean, whether input is checked or not
   * 2. 'value' - string, label text
   *
   * @param {NTF.PageObjectSelectorTransformationAlias} selectorTransformationAlias
   * @param {Selector} selector
   * @param {BemBase} bemBase
   * @returns {Selector}
   */
  transformSelector(selectorTransformationAlias, selector, bemBase) {
    selector = super.transformSelector(
      selectorTransformationAlias,
      selector,
      bemBase
    );

    const [n, v] = selectorTransformationAlias;

    if (!["checked", "value"].includes(n)) {
      return selector;
    }

    if ("checked" === n) {
      if (is.boolean(v)) {
        const className = bemBase.setMod(["checked"]).toString();
        selector = selector.filter(
          node => v === node.classList.contains(className),
          { v, className }
        );
      } else {
        throw new Error(
          `${this.displayName}: value for 'checked' transformation must ` +
            `be a boolean but it doesn't -- ${typeAndValue(v)}`
        );
      }
    }

    if ("value" === n) {
      const value = v;

      const isNonBlankStr = isNonBlankString(value);
      if (isNonBlankStr || is.regExp(value)) {
        selector = selector.child(bemBase.clone().setElt("label").toQuerySelector());
        selector = isNonBlankStr
          ? selector.withExactText(value)
          : selector.withText(value);
        selector = selector.parent(bemBase.toQuerySelector()).nth(0);
      } else {
        throw new Error(
          `${this.displayName}: value for 'value' transformation must ` +
            `be a non-blank string or a regular expression but doesn't -- ` +
            `${typeAndValue(value)}`
        );
      }
    }

    return selector;
  }

  getStateSpec() {
    // In checkable input 'Value' state part is a label's text and must be set
    // to read-only.
    return Object.assign(super.getStateSpec(), {
      checked: { simple: true, writable: true },
      value: { simple: false, writable: false }
    });
  }

  /**
   * Returns 'Checked' part of page object's state.
   *
   * @returns {Promise<boolean>}
   */
  async getChecked() {
    return this.getStatePartHelper("checked");
  }

  /**
   * Sets 'Checked' part of page object's state.
   *
   * @param {boolean} checked A new value for state part.
   * @returns {Promise<void>}
   * @throws {Error} Throws on invalid input.
   */
  async setChecked(checked) {
    if (!is.boolean(checked)) {
      throw new Error(
        `${this.displayName}: 'checked' must be a boolean but it doesn't --` +
          `${typeAndValue(checked)}`
      );
    }

    if (checked !== (await this.getChecked())) {
      await this.click();
    }
  }

  /**
   * Returns 'Value' part of page object's state -- a label element's text.
   *
   * @returns {Promise<string>}
   */
  async getValue() {
    return this.labelElementSelector.textContent;
  }

  async click(options) {
    await CheckableInputBase.prototype.click.call(
      this,
      Object.assign({}, options, { selector: this.labelElementSelector })
    );
  }

  async hover(options) {
    await CheckableInputBase.prototype.hover.call(
      this,
      Object.assign({}, options, { selector: this.labelElementSelector })
    );
  }
}
