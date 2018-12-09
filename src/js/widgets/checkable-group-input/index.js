import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import CheckableInput from '../checkable-input';
import GroupInput from '../../fragments/group-input';

const {
  Options
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = GroupInput.makeFragmentClass(GroupInput, {
  stateParts: [
    'labelShrinked',
    ['selectionMode', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents checkable group input.
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

    // In checkable group input 'Value' part of state is read-only but in input
    // it's defined as writable.
    const writableParts = super
      .getStateParts({ onlyWritable })
      .filter((v) => v !== 'value');

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return _.concat(writableParts, [
        'labelShrinked',
        'selectionMode',
        'value' // now it's read-only
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
  // State :: SelectionMode (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Input#getSelectionModePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Input#expectSelectionModePartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value (read-only)
  // ---------------------------------------------------------------------------
  // Mostly inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it because this part
   * of state is read-only.
   * 
   * @param {*} value
   * @param {Options|Object} [options]
   * @return {Promise<String>}
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
