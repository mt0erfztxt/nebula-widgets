import testFragment from 'nebula-test-fragment';

import Action from '../action-group/action';

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
 * Fragment that represents toolbar.
 *
 * State parts:
 * * own:
 *   - disabled
 *   - size (not boolean)
 */
class Toolbar extends BaseClass {

  /**
   * Class of action fragment used in this fragment.
   *
   * @returns {class}
   */
  get ActionFragment() {
    if (!this._ActionFragment) {
      this._ActionFragment = this.getSomethingFragment('Action', Toolbar);
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
   * @name Toolbar#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Toolbar#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Toolbar#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Toolbar#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Toolbar#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Size (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name Toolbar#getSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name Toolbar#expectSizeIs
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  /**
   * @name Toolbar#expectSizeIsNot
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

Object.defineProperties(Toolbar, {
  ActionFragment: {
    value: Action
  },
  bemBase: {
    value: 'nw-toolbar'
  },
  displayName: {
    value: 'nebula-widgets.widgets.toolbar'
  }
});

export default Toolbar;
