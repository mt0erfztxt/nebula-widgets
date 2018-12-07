import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import CheckableInput from '../checkable-input';
import GroupInput from '../group-input';

const {
  Options
} = testFragment;

/**
 * Base class for checkable group input fragment.
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
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkable-group-input';

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

    const writableParts = super.getStateParts({ onlyWritable });

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return _.concat(writableParts, [
        'labelShrinked',
        'selectionMode'
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
}

Object.defineProperties(CheckableGroupInput, {
  bemBase: {
    value: 'nw-checkableGroupInput'
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: CheckableInput
  }
});

export default CheckableGroupInput;
