import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';

import GroupInput from '../group-input';

import Item from './item';

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
  stateParts: ['multiLine']
});

/**
 * Fragment that represents text group input.
 *
 * State parts:
 * * derived from Input:
 *   - disabled (antonym: enabled)
 *   - invalid (antonym: valid)
 *   - size
 *   - value (writable, built from inputs values)
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
 *   - multiLine
 *
 * @extends {GroupInput}
 */
class TextGroupInput extends BaseClass {

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(options) {
    const { onlyWritable } = new Options(options, {
      defaults: {
        onlyWritable: false
      }
    });

    const writableParts = super.getStateParts({ onlyWritable });

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat(['multiLine']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: MultiLine (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name TextGroupInput#getMultiLinePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name TextGroupInput#expectIsMultiLine
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TextGroupInput#expectIsNotMultiLine
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------

  /**
   * Sets 'Value' part of state to specified `value`.
   *
   * @param {Array} [value] New value for 'Value' part of fragment's state. Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options] Options
   * @returns {Promise<Array>} Fragment's 'Value' part of state.
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async setValuePartOfState(value, options) {
    if (value === void 0) {
      return this.getValuePartOfState(options);
    }

    if (!Array.isArray(value)) {
      throw new TypeError(
        `${this.displayName}#setValuePartOfState(): 'value' argument must ` +
        `be an array but it is ${typeOf(value)} (${value})`
      );
    }

    // -- First we must remove any existing items

    const existingItemsCount = await this.getItemsCount();

    for (let i = 0; i < existingItemsCount; i++) {
      await this.getItem({ idx: i }).clickRemoveAction();
    }

    // -- Now we can add items according to passed in `value`

    const newItemsCount = value.length;
    let prevItem;

    for (let i = 0; i < newItemsCount; i++) {
      if (prevItem) {
        await prevItem.clickInsertAction();
      }

      const item = prevItem = this.getItem({ idx: i });
      await item.expectIsExist();
      await item.setValuePartOfState(value[i]);
    }

    return value;
  }
}

Object.defineProperties(TextGroupInput, {
  bemBase: {
    value: 'nw-textGroupInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-group-input'
  },
  ItemFragment: {
    value: Item
  }
});

export default TextGroupInput;
