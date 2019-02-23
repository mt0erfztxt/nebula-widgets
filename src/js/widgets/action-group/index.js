import testFragment from 'nebula-test-fragment';

import Action from './action';

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
    ['disabled', { antonym: 'enabled' }],
    ['size', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents action group.
 *
 * State parts:
 * * own:
 *   - disabled
 *   - size (not boolean)
 */
class ActionGroup extends BaseClass {

  /**
   * Class of action fragment used in this fragment.
   *
   * @returns {class}
   */
  get ActionFragment() {
    if (!this._ActionFragment) {
      this._ActionFragment = this.getSomethingFragment('Action', ActionGroup);
    }

    return this._ActionFragment;
  }

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
      return writableParts.concat([
        'disabled',
        'size'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroup#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ActionGroup#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroup#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroup#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroup#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Size (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroup#getSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name ActionGroup#expectSizeIs
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroup#expectSizeIsNot
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns action fragment.
   *
   * @param {*} [locator] See `locator` parameter of action fragment's class constructor
   * @param {*} [options] See `options` parameter of action fragment's class constructor
   * @returns {Action}
   */
  getAction(locator, options) {
    return this.getSomething('action', locator, options);
  }
}

Object.defineProperties(ActionGroup, {
  ActionFragment: {
    value: Action
  },
  bemBase: {
    value: 'nw-actionGroup'
  },
  displayName: {
    value: 'nebula-widgets.widgets.action-group'
  }
});

export default ActionGroup;
