import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import CheckableInput from '../checkable-input';
import GroupInput from '../group-input';

const {
  Options
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
   * checkable group it returns list of strings - labels of checked items,
   * otherwise it returns label of checked item or `null` when no checked
   * item in group.
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
   * Obtains 'Value' part of fragment's state and returns it because this part
   * of state is read-only.
   * 
   * @param {Array<String>|String} [value] In case of multi checkable group it must be a list of labels of items that must be checked or empty list to uncheck all items. In case of not multi checkable group it must be a label for item to check or `null` to uncheck checked item (if any). Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options]
   * @returns {Promise<Array<String>|String|null>}
   */
  async setValuePartOfState(value, options) {
    return this.getValuePartOfState(options);
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
