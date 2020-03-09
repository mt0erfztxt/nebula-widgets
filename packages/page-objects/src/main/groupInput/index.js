import is from "@sindresorhus/is";
import { Selector } from "testcafe";
import PageObject from "nebula-test-fragment/lib/main/pageObject";
import { typeAndValue } from "nebula-test-fragment/lib/main/util";
import GroupInputBase from "./base";
import { NTF } from "nebula-test-fragment/lib/main/typedef";

/**
 * Class representing page object for group input widget.
 */
export default class GroupInput extends GroupInputBase {
  static bemBase = "nw-groupInput";
  static displayName = "nw-GroupInput";

  /**
   * @type {BemBase}
   */
  #itemElementBemBase;

  /**
   * @type {Selector}
   */
  #itemElementSelector;

  /**
   * BEM base for group's 'item' element.
   *
   * @returns {BemBase}
   */
  get itemElementBemBase() {
    if (!this.#itemElementBemBase) {
      this.#itemElementBemBase = this.bemBase.clone().setElt("item");
    }

    return this.#itemElementBemBase;
  }

  /**
   * TestCafe selector for group's 'item' element.
   *
   * @returns {Selector}
   */
  get itemElementSelector() {
    if (!this.#itemElementSelector) {
      this.#itemElementSelector = this.selector.find(
        this.itemElementBemBase.toQuerySelector()
      );
    }

    return this.#itemElementSelector;
  }

  getStateSpec() {
    // 'Items' part of state is writable because it used to set state of items.
    // For some inputs, e.g. text group input, items would be automatically
    // added/removed when needed.
    return Object.assign(super.getStateSpec(), {
      items: { simple: false, writable: true },
      value: { simple: false, writable: true }
    });
  }

  /**
   * Returns page object for group input's item.
   *
   * @param {NTF.PageObjectConstructorParams} args
   * @returns {*}
   */
  getItem(...args) {
    throw new Error(`${this.displayName}: getItem() not implemented`);
  }

  /**
   * Returns number of items in group.
   *
   * @returns {Promise<number>}
   */
  async getItemsCount() {
    return this.itemElementSelector.count;
  }

  /**
   * Returns 'Items' part of page object's state.
   *
   * @returns {Promise<Array<Object<string, boolean>>>}
   */
  async getItems() {
    return Promise.all(
      [...Array(await this.getItemsCount()).keys()].map(i =>
        this.getItem(i).getState()
      )
    );
  }

  /**
   * Sets 'Items' part of page object's state.
   *
   * @param {Array<*>} [items] A new value for 'Items' part of state.
   * @returns {Promise<void>}
   * @throws {TypeError} Throws on invalid input.
   */
  async setItems(items) {
    if (!is.array(items)) {
      throw new Error(
        `${this.displayName}: 'items' argument must be an array but it ` +
          `doesn't -- ${typeAndValue(items)}`
      );
    }

    // Don't set state in parallel! TODO: Describe why not.
    for (const i of [...Array(await this.getItemsCount()).keys()]) {
      await this.getItem(i).setState(items[i]);
    }
  }

  /**
   * Returns 'Value' part of page object's state.
   *
   * @returns {Promise<Array<*>>}
   */
  async getValue() {
    return Promise.all(
      [...Array(await this.getItemsCount()).keys()].map(i =>
        this.getItem(i).getValue()
      )
    );
  }

  /**
   * Sets 'Value' part of page object's state.
   *
   * @param {Array<*>} value A new value for 'Value' part of page object's state.
   * @returns {Promise<void>}
   * @throws {TypeError} Throws on invalid input.
   */
  async setValue(value) {
    if (is.array(value)) {
      throw new Error(
        `${this.displayName}: 'value' argument must be an array but it ` +
          `doesn't -- ${typeAndValue(value)}`
      );
    }

    for (const i of [...Array(await this.getItemsCount()).keys()]) {
      await this.getItem(i).setValue(value[i]);
    }
  }

  /**
   * Clicks on item and returns it.
   *
   * @param {NTF.PageObjectConstructorParams} args
   * @returns {Promise<PageObject>}
   */
  async clickItem(...args) {
    const item = this.getItem(...args);
    await item.expectIsExist();
    await item.click();
    return item;
  }
}
