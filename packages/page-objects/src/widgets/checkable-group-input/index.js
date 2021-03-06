import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';
import { t } from 'testcafe';

import CheckableInput from '../checkable-input';
import GroupInput from '../group-input';

const {
  Options,
  utils
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {GroupInput}
 */
const BaseClass = GroupInput.makeFragmentClass(GroupInput, {
  stateParts: [
    'labelShrinked',
    'multiCheckable'
  ]
});

/**
 * Fragment that represents checkable group input.
 *
 * State parts:
 * * derived from Input:
 *   - disabled (antonym: enabled)
 *   - invalid (antonym: valid)
 *   - size
 *   - value (writable, built from checked items labels)
 *   - widget
 * * derived from GroupInput:
 *   - columns
 *   - equidistant
 *   - inline
 *   - items (read-only)
 *   - noRowGap
 *   - softColumns
 *   - stackedOnMobile
 * * own:
 *   - labelShrinked
 *   - multiCheckable
 *
 * @extends {GroupInput}
 */
class CheckableGroupInput extends BaseClass {

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(options) {
    const { onlyWritable } = new Options(options, {
      defaults: {
        onlyWritable: false
      }
    });

    // In checkable group input number of items can't be changed and so 'Items'
    // part of state is read-only.
    const writableParts = super
      .getStateParts({ onlyWritable })
      .filter((v) => v !== 'items');

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat([
        'items', // made read-only
        'labelShrinked',
        'multiCheckable'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: LabelShrinked (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name CheckableGroupInput#getLabelShrinkedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name CheckableGroupInput#expectIsLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name CheckableGroupInput#expectIsNotLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: MultiCheckable (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name CheckableGroupInput#getMultiCheckablePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name CheckableGroupInput#expectIsMultiCheckable
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name CheckableGroupInput#expectIsNotMultiCheckable
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value (writable, overrides Input)
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it. In case of multi
   * checkable group it returns list of strings - labels of checked items. In
   * case of not multi checkable group it returns label of checked item or
   * `null` when no checked item in group.
   *
   * @returns {Promise<Array<String>|null>}
   */
  async getValuePartOfState() {
    const multiCheckable = await this.getMultiCheckablePartOfState();
    const itemsCount = await this.getItemsCount();
    const result = [];

    for (let i = 0; i < itemsCount; i++) {
      const item = this.getItem({ idx: i })
      const checked = await item.getCheckedPartOfState();

      if (checked) {
        if (multiCheckable) {
          result.push(await item.getValuePartOfState());
        }
        else {
          return item.getValuePartOfState();
        }
      }
    }

    return (multiCheckable ? result : null);
  }

  /**
   * Sets 'Value' part of fragment's state to specified value.
   *
   * @param {Array<String>|String} [value] In case of multi checkable group it must be a list of labels of items that must be checked or empty list to uncheck all items. In case of not multi checkable group it must be a label for item to check or `null` to uncheck checked item (if any). Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options]
   * @returns {Promise<Array<String>|String|null>}
   */
  async setValuePartOfState(value, options) {
    if (_.isUndefined(value)) {
      return this.getValuePartOfState(options);
    }

    const multiCheckable = await this.getMultiCheckablePartOfState();

    if (multiCheckable) {
      if (!_.isArray(value)) {
        throw new TypeError(
          `${this.displayName}#setValuePartOfState(): 'value' argument must ` +
          `be an array but it is ${typeOf(value)} (${value})`
        );
      }

      const itemsCount = await this.getItemsCount();

      for (let i = 0; i < itemsCount; i++) {
        const item = this.getItem({ idx: i });
        const itemValue = await item.getValuePartOfState();
        await item.setCheckedPartOfState(value.includes(itemValue), options);
      }
    }
    else {
      const item = this.getItem({ value });
      await item.setCheckedPartOfState(true, options);
    }

    return this.getValuePartOfState(options);
  }

  /**
   * Asserts that 'Value' part of fragment's state is equal specified value.
   *
   * @param {Array<String>} value List of labels of group's checked items
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy, 'Value' part of state must not be equal specified value to pass assertion
   * @param {Boolean} [options.sameOrder=true] Meaningless for not multi checkable groups. When truthy, items in 'Value' part of state must be in same order as in specified value to pass assertion
   * @returns {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    const { isNot } = new Options(options, {
      defaults: {
        isNot: false
      }
    });

    const multiCheckable = await this.getMultiCheckablePartOfState();

    if (multiCheckable) {
      await GroupInput.prototype.expectValuePartOfStateIs.call(
        this,
        value,
        options
      );
    }
    else {
      const val = await this.getValuePartOfState(options);
      const assertionName = utils.buildTestCafeAssertionName('eql', { isNot });
      await t.expect(val)[assertionName](value);
    }
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that input has value.
   *
   * @returns {Promise<void>}
   */
  async expectHasValue() {
    const multiCheckable = await this.getMultiCheckablePartOfState();

    if (multiCheckable) {
      await this.expectValueIsNot([]);
    }
    else {
      await this.expectValueIsNot(null);
    }
  }

  /**
   * Asserts that input has no value.
   *
   * @returns {Promise<void>}
   */
  async expectHasNoValue() {
    const multiCheckable = await this.getMultiCheckablePartOfState();

    if (multiCheckable) {
      await this.expectValueIs([]);
    }
    else {
      await this.expectValueIs(null);
    }
  }

  /**
   * Shortcut for {@link CheckableGroupInput#expectValuePartOfStateIs}.
   *
   * @param {*} value Fragment's value must be equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIs(value) {
    await this.expectValuePartOfStateIs(value);
  }

  /**
   * Shortcut for {@link CheckableGroupInput#expectValuePartOfStateIs} with
   * 'isNot' option set to `true`.
   *
   * @param {*} value Fragment's value must be not equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIsNot(value) {
    await this.expectValuePartOfStateIs(value, { isNot: true });
  }
}

Object.defineProperties(CheckableGroupInput, {
  bemBase: {
    value: 'nw-checkableGroupInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.checkable-group-input'
  },
  ItemFragment: {
    value: CheckableInput
  }
});

export default CheckableGroupInput;
