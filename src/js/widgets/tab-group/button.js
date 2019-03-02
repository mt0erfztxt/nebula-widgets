import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['active'],
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Fragment that represents button of tab group.
 *
 * State parts:
 * * own:
 *   - active
 *   - disabled (antonym: enabled)
 *
 * @extends {Fragment}
 */
class TabGroupButton extends BaseClass {

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
      return writableParts.concat(['active', 'disabled']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Active (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroupButton#getActivePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name TabGroupButton#expectIsActive
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroupButton#expectIsNotActive
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroupButton#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name TabGroupButton#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroupButton#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroupButton#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroupButton#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */
}

Object.defineProperties(TabGroupButton, {
  bemBase: {
    value: 'nw-tabGroup__button'
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group.button'
  }
});

export default TabGroupButton;
