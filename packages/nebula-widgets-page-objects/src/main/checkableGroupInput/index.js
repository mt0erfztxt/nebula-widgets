import is from "@sindresorhus/is";
import CheckableInput from "../checkableInput";
import CheckableGroupInputBase from "./base";
import { typeAndValue } from "nebula-test-fragment/lib/main/util";

export default class CheckableGroupInput extends CheckableGroupInputBase {
  static bemBase = "nw-checkableGroupInput";
  static displayName = "nw-CheckableGroupInput";

  getStateSpec() {
    // In checkable group input number of items can't be changed and so 'Items'
    // part of state is read-only.
    return Object.assign(super.getStateSpec(), {
      items: { simple: false, writable: false }
    });
  }

  /**
   * Returns page object for group input's item.
   *
   * @param {NTF.PageObjectConstructorParams} args
   * @returns {CheckableInput}
   */
  getItem(...args) {
    return this.getPageObjectHelper(CheckableInput, ...args);
  }

  /**
   * Returns 'Value' part of page object's state.
   *
   * @returns {Promise<Array<string>|undefined>} In case of multi checkable group it returns list of strings -- labels' text of checked items. In case of not multi checkable group it returns label's text of checked item or `undefined` when no checked item in group.
   *
   */
  async getValue() {
    const multiCheckable = await this.getMultiCheckable();
    const value = [];

    for (const i of [...Array(await this.getItemsCount()).keys()]) {
      const item = this.getItem(i);
      if (await item.getChecked()) {
        if (multiCheckable) {
          value.push(await item.getValue());
        } else {
          return item.getValue();
        }
      }
    }

    return multiCheckable ? value : undefined;
  }

  /**
   * Sets 'Value' part of fragment's state to specified value.
   *
   * @param {Array<string>|string} [value] In case of multi checkable group it must be a list of label's text of items that must be checked or empty list to uncheck all items. In case of not multi checkable group it must be a label's text of item to check or `undefined` to uncheck checked item (if any).
   * @returns {Promise<void>}
   * @throws {Error} Throws error on invalid input.
   */
  async setValue(value) {
    const multiCheckable = await this.getMultiCheckable();

    if (multiCheckable && !is.array(value)) {
      throw new Error(
        `${this.displayName}: 'value' must be an array but it doesn't --` +
          typeAndValue(value)
      );
    }

    if (!multiCheckable && is.array(value)) {
      throw new Error(
        `${this.displayName}: 'value' must be a string but it doesn't --` +
          typeAndValue(value)
      );
    }

    if (multiCheckable) {
      for (const i of [...Array(await this.getItemsCount()).keys()]) {
        const item = this.getItem(i);
        const itemValue = await item.getValue();
        await item.setChecked(value.includes(itemValue));
      }
    } else {
      await this.getItem(["value", value]).setChecked(true);
    }
  }
}
