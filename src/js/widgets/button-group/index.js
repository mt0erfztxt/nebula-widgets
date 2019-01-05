import testFragment from 'nebula-test-fragment';

import Button from '../button';

const {
  bem: { BemBase },
  Fragment,
  Options,
  utils
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['alignment', { isBoolean: false }],
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Fragment that represents button group.
 *
 * State parts:
 * * own:
 *   - alignment (not boolean)
 *   - disabled (antonym: enabled)
 *
 * @extends {Fragment}
 */
class ButtonGroup extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'alignment' - String
   *
   * @param {*} transformations
   * @param {*} sel
   * @param {BemBase} bemBase
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (transformations.hasOwnProperty(k) && k === 'alignment') {
        const value = transformations[k];

        if (utils.isNonBlankString(value)) {
          sel = sel.filter('.' + bemBase.setMod(['alignment', value], {
            fresh: true
          }));
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'alignment' transformation must ` +
            `be a non-blank string but it is ${typeOf(value)} (${value})`
          );
        }
      }
    }

    return sel;
  }

  /**
   * Class of button fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When item fragment class is not valid.
   */
  get ButtonFragment() {
    if (!this._ButtonFragment) {
      this._ButtonFragment = this.getSomethingFragment('Button', ButtonGroup);
    }

    return this._ButtonFragment;
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
      return writableParts.concat(['alignment', 'disabled']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Alignment (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name ButtonGroup#getAlignmentPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name ButtonGroup#expectAlignmentIs
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectAlignmentIsNot
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name ButtonGroup#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ButtonGroup#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns button fragment.
   *
   * @param {*} [locator] See `locator` parameter of button fragment's class constructor
   * @param {*} [options] See `options` parameter of button fragment's class constructor
   * @returns {Fragment}
   */
  getButton(locator, options) {
    return this.getSomething('button', locator, options);
  }
}

Object.defineProperties(ButtonGroup, {
  bemBase: {
    value: 'nw-buttonGroup'
  },
  ButtonFragment: {
    value: Button
  },
  displayName: {
    value: 'nebula-widgets.widgets.button-group'
  }
});

export default ButtonGroup;
